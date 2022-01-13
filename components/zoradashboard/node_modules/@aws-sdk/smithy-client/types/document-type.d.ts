/**
 * Smithy document type values.
 */
export declare namespace DocumentType {
    type Value = Scalar | Structure | List;
    type Scalar = string | number | boolean | null;
    type Structure = {
        [member: string]: Value;
    };
    interface List extends Array<Value> {
    }
}
