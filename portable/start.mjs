import {createServer} from "node:http";
import {mkdirSync,readFileSync,writeFileSync,existsSync} from "node:fs";
import {join,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {randomBytes,randomUUID,createHash,timingSafeEqual} from "node:crypto";
const here=fileURLToPath(new URL(".",import.meta.url)), data=resolve(process.env.DATA_DIR||join(here,"veriler"));
mkdirSync(data,{recursive:true,mode:0o700});process.env.SLOVENIJA_DB=join(data,"dosyalar.sqlite");
const {database}=await import("./database.mjs"),api=await import("./routes.mjs");
const keyPath=join(data,"yonetici-anahtari");
if(!existsSync(keyPath))writeFileSync(keyPath,randomBytes(32).toString("hex"),{mode:0o600,flag:"wx"});
const secret=readFileSync(keyPath,"utf8").trim();
const hash=s=>createHash("sha256").update(s).digest("hex");
const host=process.env.HOST||"127.0.0.1",port=Number(process.env.PORT||4197);
const origin=new URL(process.env.PUBLIC_ORIGIN||("http://127.0.0.1:"+port)).origin;
if(!["localhost","127.0.0.1","::1"].includes(host)&&!origin.startsWith("https://"))throw Error("Dış erişim için PUBLIC_ORIGIN alanına HTTPS adresini girin.");
const ttl=30*86400000;
function session(res,id){const token=randomBytes(32).toString("hex");database.prepare("DELETE FROM access_sessions WHERE expires < ?").run(Date.now());database.prepare("INSERT INTO access_sessions VALUES(?,?,?)").run(hash(token),id,Date.now()+ttl);res.setHeader("Set-Cookie","desk_session="+token+"; Path=/; HttpOnly; SameSite=Lax; Max-Age="+ttl/1000+(origin.startsWith("https:")?"; Secure":""));}
export async function handle(req,res){
 let url=new URL(req.url,origin);
 res.setHeader("Referrer-Policy","no-referrer");res.setHeader("X-Content-Type-Options","nosniff");res.setHeader("Cache-Control","no-store");
 const redirect=path=>{res.writeHead(303,{Location:path});res.end();};
 const send=(status,type,data)=>{res.writeHead(status,{"Content-Type":type});res.end(data);};
 const token=(req.headers.cookie||"").match(/(?:^|;\s*)desk_session=([a-f0-9]{64})(?:;|$)/)?.[1];
 const user=token&&database.prepare("SELECT identity FROM access_sessions WHERE digest=? AND expires>?").get(hash(token),Date.now())?.identity;
 if(url.pathname==="/yonetim"&&req.method==="GET"){
  const key=url.searchParams.get("anahtar")||"";if(!timingSafeEqual(Buffer.from(hash(key),"hex"),Buffer.from(hash(secret),"hex")))return send(403,"text/plain; charset=utf-8","Geçersiz yönetici bağlantısı.");
  session(res,"desk-owner");return redirect("/");
 }
 if(url.pathname==="/api/desk"){
  if(!user)return send(401,"application/json",JSON.stringify({error:"Dosya erişimi için başlangıçtaki yönetici bağlantısını veya firmanıza verilen daveti açın."}));
  const method=req.method;if(!["GET","POST","PATCH"].includes(method))return send(405,"text/plain","");
  if(method!=="GET"&&req.headers.origin&&req.headers.origin!==origin)return send(403,"application/json","{}");
  const chunks=[];let size=0;for await(const b of req){size+=b.length;if(size>64000)return send(413,"application/json",'{"error":"Dosya boyutu sınırı aşıldı."}');chunks.push(b);}
  const body=chunks.length?Buffer.concat(chunks).toString("utf8"):undefined;
  if(method==="POST"&&user!=="desk-owner"&&body){let data;try{data=JSON.parse(body);}catch{return send(400,"application/json","{}");}if(data.action==="invite")return send(403,"application/json",'{"error":"Davet bağlantısını masa yöneticisi oluşturur."}');}
  const r=await api[method](new Request(origin+"/api/desk",{method,headers:{"oai-authenticated-user-id":user},body}));
  return send(r.status,"application/json; charset=utf-8",await r.text());
 }
 if(url.pathname==="/"&&req.method==="GET"){
  if(!user&&url.searchParams.has("davet")){const invitation=database.prepare("SELECT owner FROM desk_invites WHERE token=?").get(url.searchParams.get("davet"));if(!invitation)return send(404,"text/plain; charset=utf-8","Davet bulunamadı.");session(res,randomUUID());}
  return send(200,"text/html; charset=utf-8",readFileSync(join(here,"index.html")));
 }
 if(url.pathname==="/firma-basvurusu.html" && req.method==="GET")return send(200,"text/html; charset=utf-8",readFileSync(join(here,"firma-basvurusu.html")));
 if(url.pathname==="/slovenija-calisma-rehberi.md")return send(200,"text/markdown; charset=utf-8",readFileSync(join(here,"Slovenija-Calisma-Rehberi.md")));
 send(404,"text/plain; charset=utf-8","Sayfa bulunamadı.");
}
if(process.env.SLOVENIJA_TEST!=="1"){
 createServer((req,res)=>handle(req,res).catch(()=>{if(!res.headersSent)res.writeHead(500,{"Content-Type":"application/json"});res.end('{"error":"İşlem tamamlanamadı."}');})).listen(port,host,()=>{console.log("Slovenija çalışma masası hazır. Yöneticiye özel bağlantı (firmalara göndermeyin):\n"+origin+"/yonetim?anahtar="+secret);});
}
