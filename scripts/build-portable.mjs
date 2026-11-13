// Produce the standalone preview from the same React entry used by the hosted site.
import { build } from "esbuild";
import { readFile, writeFile, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");
async function bundle(contents) {
  const { outputFiles } = await build({
    absWorkingDir: root,
    bundle: true,
    minify: true,
    write: false,
    target: "es2022",
    jsx: "automatic",
    define: { "process.env.NODE_ENV": '"production"' },
    stdin: {
      contents,
      loader: "tsx",
      resolveDir: root,
    },
  });
  return outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
}
const photos = {};
for (const id of [
  "harbor",
  "tekstil",
  "celik",
  "gida",
  "makine",
  "hvac",
  "enerji",
]) {
  const path =
    id === "harbor" ? "public/harbor.webp" : "public/editorial/" + id + ".webp";
  photos[id] =
    "data:image/webp;base64," +
    (await readFile(root + path)).toString("base64");
}
const css = (
  await Promise.all(
    ["globals", "atlas", "journal", "intake"].map((name) =>
      read("app/" + name + ".css"),
    ),
  )
).join("\n");
function standalone(js, title, pageCss = "") {
  return (
    '<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' +
    title +
    '</title><link rel="icon" href="data:image/svg+xml,' +
    favicon +
    '"><style>' +
    css + pageCss +
    '</style><div id="root"></div><script>window.atlasPhotos=' +
    JSON.stringify(photos) +
    ";" +
    js +
    "</script></html>"
  );
}
const favicon = encodeURIComponent(await read("public/favicon.svg"));
const atlas = await bundle(
  'import {createRoot} from "react-dom/client"; import Page from "./app/page"; createRoot(document.getElementById("root")).render(<Page/>);',
);
const intake = await bundle(
  'import {createRoot} from "react-dom/client"; import {Intake} from "./app/intake"; createRoot(document.getElementById("root")).render(<><header className="standalone-brand">investors.com.tr · Slovenya Brifing Masası</header><main className="shell inner-main"><Intake offline invite="" save={async()=>{}} /></main><footer><div className="shell">Orta Avrupa ve Slovenya Yatırım İnisiyatifi</div></footer></>);',
);
await writeFile(
  root + "portable/index.html",
  standalone(atlas, "investors.com.tr · Slovenya Brifing Masası", await read("app/company-brief.css")),
);
const form = standalone(intake, "Firma başvurusu · investors.com.tr · Slovenya Brifing Masası");
await writeFile(root + "public/firma-basvurusu.html", form);
await writeFile(root + "portable/firma-basvurusu.html", form);
for (const name of ["app", "lib", "db"])
  await cp(root + name, root + "portable/kaynak/" + name, { recursive: true });
await cp(root + "public/fotograf.txt", root + "portable/fotograf.txt");
await build({
  absWorkingDir: root,
  entryPoints: ["app/api/desk/route.ts"],
  outfile: "portable/routes.mjs",
  platform: "node",
  target: "node24",
  format: "esm",
  bundle: true,
  minify: true,
  plugins: [
    {
      name: "local-database",
      setup(builder) {
        builder.onResolve({ filter: /^cloudflare:workers$/ }, () => ({
          path: "./database.mjs",
          external: true,
        }));
      },
    },
  ],
});
