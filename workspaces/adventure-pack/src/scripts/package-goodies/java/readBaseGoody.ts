import { WritableDeep } from "type-fest";

import type { JavaGoody } from "../../../app/parsers/javaGoodyParser";
import { extractJavaesqueImports } from "../extractJavaesqueImports";
import { readCode } from "./readCode";
import { readMetadata } from "./readMetadata";
import { splitCodeIntoClasses } from "./splitCodeIntoClasses";

export type JavaGoodyBase = Omit<WritableDeep<JavaGoody>, "importedBy">;

export async function readBaseGoody(
  packageName: string,
): Promise<JavaGoodyBase> {
  const [codeWithImports, { name }] = await Promise.all([
    readCode(packageName),
    readMetadata(packageName),
  ]);

  const { codeWithoutImports, coreImports, imports, importsCode } =
    extractJavaesqueImports(codeWithImports);

  const codeByClass = splitCodeIntoClasses(codeWithoutImports);

  return {
    codeByClass,
    coreImports,
    imports: Array.from(imports),
    importsCode,
    language: "java",
    name,
    packageName,
  };
}
