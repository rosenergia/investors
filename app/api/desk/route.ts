import { getDb } from "../../../db";
import {cases,invitations} from "../../../db/schema";
import {and,eq,or,desc} from "drizzle-orm";
import {isEntry,stages} from "../../../lib/assessment";
export const dynamic="force-dynamic";
function json(data:unknown,status=200){return Response.json(data,{status,headers:{"Cache-Control":"no-store, private"}});}
const identity=(r:Request)=>r.headers.get("oai-authenticated-user-id");
function safe(r:Request){const o=r.headers.get("origin");return !o||o===new URL(r.url).origin;}
export async function GET(r:Request){const user=identity(r);if(!user)return json({error:"Dosyalar için oturum açın."},401);
 const db=getDb();const [invite]=await db.select().from(invitations).where(eq(invitations.owner,user));
 const rows=await db.select().from(cases).where(or(eq(cases.desk,user),eq(cases.author,user))).orderBy(desc(cases.created));
 return json({invite:invite?.token||"",cases:rows.map(({desk,author,...row})=>({...row,payload:JSON.parse(row.payload),canReview:desk===user}))});}
export async function POST(r:Request){const user=identity(r);if(!user)return json({error:"Kaydetmek için oturum açın."},401);if(!safe(r))return json({},403);
 const body=await r.json().catch(()=>null) as {action?:unknown;id?:unknown;entry?:unknown}|null; if(!body)return json({},400);const db=getDb();
 if(body.action==="invite"){await db.insert(invitations).values({owner:user,token:crypto.randomUUID()}).onConflictDoNothing();const [i]=await db.select().from(invitations).where(eq(invitations.owner,user));return json({token:i.token});}
 if(!isEntry(body.entry)||typeof body.id!=="string"||!/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(body.id))return json({error:"Dosyadaki zorunlu alanları ve kayıt biçimini kontrol edin."},400);
 const p=body.entry;let desk=user;
 if(p.invite){const [i]=await db.select().from(invitations).where(eq(invitations.token,p.invite));if(!i)return json({error:"Davet bağlantısı geçersiz. Firmayı davet eden kişiden bağlantıyı isteyin."},400);desk=i.owner;}
 const payload=JSON.stringify({...p,invite:""});await db.insert(cases).values({id:body.id,author:user,desk,payload,stage:stages[0],created:Date.now()}).onConflictDoNothing();const [saved]=await db.select().from(cases).where(eq(cases.id,body.id));if(saved.author!==user||saved.payload!==payload||saved.desk!==desk)return json({error:"Bu kayıt başka bir sürümde kaydedilmiş. Dosyalarım bölümünü kontrol edin."},409);return json({id:body.id});}
export async function PATCH(r:Request){const user=identity(r);if(!user||!safe(r))return json({},403);const b=await r.json().catch(()=>null) as {id:string;revision:number;stage:string;task:string;assignee:string;due:string}|null;if(!b||typeof b.id!=="string"||!Number.isSafeInteger(b.revision)||!stages.includes(b.stage)||![b.task,b.assignee,b.due].every(x=>typeof x==="string"&&x.length<=2000)||b.due&&!/^\d{4}-\d{2}-\d{2}$/.test(b.due))return json({},400);
 const updated=await getDb().update(cases).set({stage:b.stage,task:b.task,assignee:b.assignee,due:b.due,revision:b.revision+1}).where(and(eq(cases.id,b.id),eq(cases.desk,user),eq(cases.revision,b.revision))).returning({id:cases.id});return updated.length?json({ok:true}):json({error:"Dosya değişmiş veya erişiminiz yok. Dosyayı yeniden açın."},409);}
