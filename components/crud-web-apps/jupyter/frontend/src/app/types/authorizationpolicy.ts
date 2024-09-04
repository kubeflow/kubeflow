//2024/01/21 YCL create//
export interface AuthorizationPolicyResponseObject {
  metadata: {
    name: string;
    namespace: string;
  }
  spec: {
    rules: {
      to:{
        
      }
      when: {
        key: string;
        values: string[];
      }[];
    }[];
}}
//2024/01/21 YCL create//
