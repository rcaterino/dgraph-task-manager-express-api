"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGraphQL = void 0;
/*
This is an example snippet - you should consider tailoring it
to your service.
*/
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(process.env.DGRAPH_ENDPOINT || "", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": process.env.X_AUTH_TOKEN || "",
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName
        })
    });
    return await result.json();
}
exports.fetchGraphQL = fetchGraphQL;
