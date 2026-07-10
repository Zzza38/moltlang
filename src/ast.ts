export interface Program {
  kind: "Program";
  declarations: FunctionDeclaration[];
}

export interface FunctionDeclaration {
  kind: "FunctionDeclaration";
  name: string;
  parameters: Parameter[];
  returnType: string;
  body: ReturnStatement[];
}

export interface Parameter { name: string; typeName: string }
export interface ReturnStatement { kind: "ReturnStatement"; value: Expression }
export type Expression = IdentifierExpression | IntegerExpression;
export interface IdentifierExpression { kind: "Identifier"; name: string }
export interface IntegerExpression { kind: "IntegerLiteral"; value: number }
