"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requests = exports.signingDate = exports.credentials = exports.service = exports.region = void 0;
exports.region = "us-east-1";
exports.service = "service";
exports.credentials = {
    accessKeyId: "AKIDEXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",
};
exports.signingDate = new Date("2015-08-30T12:36:00Z");
exports.requests = [
    {
        name: "get-header-key-duplicate",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "my-header1": "value2,value2,value1",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;my-header1;x-amz-date, Signature=c9d5ea9f3f72853aea855b47ea873832890dbdd183b4468f858259531a5138ea",
    },
    {
        name: "get-header-value-multiline",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "my-header1": "value1,value2,value3",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;my-header1;x-amz-date, Signature=ba17b383a53190154eb5fa66a1b836cc297cc0a3d70a5d00705980573d8ff790",
    },
    {
        name: "get-header-value-order",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "my-header1": "value4,value1,value3,value2",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;my-header1;x-amz-date, Signature=08c7e5a9acfcfeb3ab6b2185e75ce8b1deb5e634ec47601a50643f830c755c01",
    },
    {
        name: "get-header-value-trim",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "my-header1": "value1",
                "my-header2": '"a   b   c"',
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;my-header1;my-header2;x-amz-date, Signature=acc3ed3afb60bb290fc8d2dd0098b9911fcaa05412b367055dee359757a9c736",
    },
    {
        name: "get-unreserved",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/-._~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=07ef7494c76fa4850883e2b006601f940f8a34d404d0cfa977f52a65bbf5f24f",
    },
    {
        name: "get-utf8",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/ሴ",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=8318018e0b0f223aa2bbf98705b62bb787dc9c0e678f255a891fd03141be5d85",
    },
    {
        name: "get-vanilla",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=5fa00fa31553b73ebf1942676e86291e8372ff2a2260956d9b8aae1d763fbf31",
    },
    {
        name: "get-vanilla-empty-query-key",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {
                Param1: "value1",
            },
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=a67d582fa61cc504c4bae71f336f98b97f1ea3c7a6bfe1b6e45aec72011b9aeb",
    },
    {
        name: "get-vanilla-query",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=5fa00fa31553b73ebf1942676e86291e8372ff2a2260956d9b8aae1d763fbf31",
    },
    {
        name: "get-vanilla-query-order-key-case",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {
                Param2: "value2",
                Param1: "value1",
            },
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=b97d918cfa904a5beff61c982a1b6f458b799221646efd99d3219ec94cdf2500",
    },
    {
        name: "get-vanilla-query-unreserved",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {
                "-._~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz": "-._~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            },
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=9c3e54bfcdf0b19771a7f523ee5669cdf59bc7cc0884027167c21bb143a40197",
    },
    {
        name: "get-vanilla-utf8-query",
        request: {
            protocol: "https:",
            method: "GET",
            hostname: "example.amazonaws.com",
            query: {
                ሴ: "bar",
            },
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=2cdec8eed098649ff3a119c94853b13c643bcf08f8b0a1d91e12c9027818dd04",
    },
    {
        name: "post-header-key-case",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=5da7c1a2acd57cee7505fc6676e4e544621c30862966e37dddb68e92efbe5d6b",
    },
    {
        name: "post-header-key-sort",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "my-header1": "value1",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;my-header1;x-amz-date, Signature=c5410059b04c1ee005303aed430f6e6645f61f4dc9e1461ec8f8916fdf18852c",
    },
    {
        name: "post-header-value-case",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "my-header1": "VALUE1",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;my-header1;x-amz-date, Signature=cdbc9802e29d2942e5e10b5bccfdd67c5f22c7c4e8ae67b53629efa58b974b7d",
    },
    {
        name: "post-sts-header-after",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=5da7c1a2acd57cee7505fc6676e4e544621c30862966e37dddb68e92efbe5d6b",
    },
    {
        name: "post-sts-header-before",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
                "x-amz-security-token": "AQoDYXdzEPT//////////wEXAMPLEtc764bNrC9SAPBSM22wDOk4x4HIZ8j4FZTwdQWLWsKWHGBuFqwAeMicRXmxfpSPfIeoIYRqTflfKD8YUuwthAx7mSEI/qkPpKPi/kMcGdQrmGdeehM4IC1NtBmUpp2wUE8phUZampKsburEDy0KPkyQDYwT7WZ0wq5VSXDvp75YU9HFvlRd8Tx6q6fE8YQcHNVXAkiY9q6d+xo0rKwT38xVqr7ZD0u0iPPkUL64lIZbqBAz+scqKmlzm8FDrypNC9Yjc8fPOLn9FX9KSYvKTr4rvx3iSIlTJabIQwj2ICCR/oLxBA==",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date;x-amz-security-token, Signature=85d96828115b5dc0cfc3bd16ad9e210dd772bbebba041836c64533a82be05ead",
    },
    {
        name: "post-vanilla",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=5da7c1a2acd57cee7505fc6676e4e544621c30862966e37dddb68e92efbe5d6b",
    },
    {
        name: "post-vanilla-empty-query-value",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {
                Param1: "value1",
            },
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=28038455d6de14eafc1f9222cf5aa6f1a96197d7deb8263271d420d138af7f11",
    },
    {
        name: "post-vanilla-query",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {
                Param1: "value1",
            },
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=28038455d6de14eafc1f9222cf5aa6f1a96197d7deb8263271d420d138af7f11",
    },
    {
        name: "post-vanilla-query-nonunreserved",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {
                "@#$%^": "",
                "+": '/,?><`";:\\|][{}',
            },
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=66c82657c86e26fb25238d0e69f011edc4c6df5ae71119d7cb98ed9b87393c1e",
    },
    {
        name: "post-vanilla-query-space",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {
                p: "",
            },
            headers: {
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=host;x-amz-date, Signature=e71688addb58a26418614085fb730ba3faa623b461c17f48f2fbdb9361b94a9b",
    },
    {
        name: "post-x-www-form-urlencoded",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            body: "Param1=value1",
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=ff11897932ad3f4e8b18135d722051e5ac45fc38421b1da7b9d196a0fe09473a",
    },
    {
        name: "post-x-www-form-urlencoded-parameters",
        request: {
            protocol: "https:",
            method: "POST",
            hostname: "example.amazonaws.com",
            query: {},
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=utf8",
                host: "example.amazonaws.com",
                "x-amz-date": "20150830T123600Z",
            },
            body: "Param1=value1",
            path: "/",
        },
        authorization: "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/service/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=1a72ec8f64bd914b0e42e42607c7fbce7fb2c7465f63e3092b3b0d39fa77a6fe",
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdGUuZml4dHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdWl0ZS5maXh0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFhLFFBQUEsTUFBTSxHQUFHLFdBQVcsQ0FBQztBQUNyQixRQUFBLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFDcEIsUUFBQSxXQUFXLEdBQUc7SUFDekIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsZUFBZSxFQUFFLDBDQUEwQztDQUM1RCxDQUFDO0FBRVcsUUFBQSxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUvQyxRQUFBLFFBQVEsR0FBb0I7SUFDdkM7UUFDRSxJQUFJLEVBQUUsMEJBQTBCO1FBQ2hDLE9BQU8sRUFBRTtZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixZQUFZLEVBQUUsc0JBQXNCO2dCQUNwQyxZQUFZLEVBQUUsa0JBQWtCO2FBQ2pDO1lBQ0QsSUFBSSxFQUFFLEdBQUc7U0FDVjtRQUNELGFBQWEsRUFDWCx1TUFBdU07S0FDMU07SUFDRDtRQUNFLElBQUksRUFBRSw0QkFBNEI7UUFDbEMsT0FBTyxFQUFFO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFlBQVksRUFBRSxzQkFBc0I7Z0JBQ3BDLFlBQVksRUFBRSxrQkFBa0I7YUFDakM7WUFDRCxJQUFJLEVBQUUsR0FBRztTQUNWO1FBQ0QsYUFBYSxFQUNYLHVNQUF1TTtLQUMxTTtJQUNEO1FBQ0UsSUFBSSxFQUFFLHdC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QXVCO1lBQ2pDLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxtQ0FBbUM7Z0JBQ25ELElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFlBQVksRUFBRSxrQkFBa0I7YUFDakM7WUFDRCxJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsR0FBRztTQUNWO1FBQ0QsYUFBYSxFQUNYLHlNQUF5TTtLQUM1TTtJQUNEO1FBQ0UsSUFBSSxFQUFFLHVDQUF1QztRQUM3QyxPQUFPLEVBQUU7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGlEQUFpRDtnQkFDakUsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsWUFBWSxFQUFFLGtCQUFrQjthQUNqQztZQUNELElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxHQUFHO1NBQ1Y7UUFDRCxhQUFhLEVBQ1gseU1BQXlNO0tBQzVNO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVzdENhc2Uge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0O1xuICBhdXRob3JpemF0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCByZWdpb24gPSBcInVzLWVhc3QtMVwiO1xuZXhwb3J0IGNvbnN0IHNlcnZpY2UgPSBcInNlcnZpY2VcIjtcbmV4cG9ydCBjb25zdCBjcmVkZW50aWFscyA9IHtcbiAgYWNjZXNzS2V5SWQ6IFwiQUtJREVYQU1QTEVcIixcbiAgc2VjcmV0QWNjZXNzS2V5OiBcIndKYWxyWFV0bkZFTUkvSzdNREVORytiUHhSZmlDWUVYQU1QTEVLRVlcIixcbn07XG5cbmV4cG9ydCBjb25zdCBzaWduaW5nRGF0ZSA9IG5ldyBEYXRlKFwiMjAxNS0wOC0zMFQxMjozNjowMFpcIik7XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0czogQXJyYXk8VGVzdENhc2U+ID0gW1xuICB7XG4gICAgbmFtZTogXCJnZXQtaGVhZGVyLWtleS1kdXBsaWNhdGVcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIm15LWhlYWRlcjFcIjogXCJ2YWx1ZTIsdmFsdWUyLHZhbHVlMVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7bXktaGVhZGVyMTt4LWFtei1kYXRlLCBTaWduYXR1cmU9YzlkNWVhOWYzZjcyODUzYWVhODU1YjQ3ZWE4NzM4MzI4OTBkYmRkMTgzYjQ0NjhmODU4MjU5NTMxYTUxMzhlYVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtaGVhZGVyLXZhbHVlLW11bHRpbGluZVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwibXktaGVhZGVyMVwiOiBcInZhbHVlMSx2YWx1ZTIsdmFsdWUzXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDtteS1oZWFkZXIxO3gtYW16LWRhdGUsIFNpZ25hdHVyZT1iYTE3YjM4M2E1MzE5MDE1NGViNWZhNjZhMWI4MzZjYzI5N2NjMGEzZDcwYTVkMDA3MDU5ODA1NzNkOGZmNzkwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdldC1oZWFkZXItdmFsdWUtb3JkZXJcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIm15LWhlYWRlcjFcIjogXCJ2YWx1ZTQsdmFsdWUxLHZhbHVlMyx2YWx1ZTJcIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O215LWhlYWRlcjE7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTA4YzdlNWE5YWNmY2ZlYjNhYjZiMjE4NWU3NWNlOGIxZGViNWU2MzRlYzQ3NjAxYTUwNjQzZjgzMGM3NTVjMDFcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ2V0LWhlYWRlci12YWx1ZS10cmltXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJteS1oZWFkZXIxXCI6IFwidmFsdWUxXCIsXG4gICAgICAgIFwibXktaGVhZGVyMlwiOiAnXCJhICAgYiAgIGNcIicsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDtteS1oZWFkZXIxO215LWhlYWRlcjI7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPWFjYzNlZDNhZmI2MGJiMjkwZmM4ZDJkZDAwOThiOTkxMWZjYWEwNTQxMmIzNjcwNTVkZWUzNTk3NTdhOWM3MzZcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ2V0LXVucmVzZXJ2ZWRcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvLS5ffjAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTA3ZWY3NDk0Yzc2ZmE0ODUwODgzZTJiMDA2NjAxZjk0MGY4YTM0ZDQwNGQwY2ZhOTc3ZjUyYTY1YmJmNWYyNGZcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ2V0LXV0ZjhcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIv4Yi0XCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTgzMTgwMThlMGIwZjIyM2FhMmJiZjk4NzA1YjYyYmI3ODdkYzljMGU2NzhmMjU1YTg5MWZkMDMxNDFiZTVkODVcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ2V0LXZhbmlsbGFcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTVmYTAwZmEzMTU1M2I3M2ViZjE5NDI2NzZlODYyOTFlODM3MmZmMmEyMjYwOTU2ZDliOGFhZTFkNzYzZmJmMzFcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ2V0LXZhbmlsbGEtZW1wdHktcXVlcnkta2V5XCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIFBhcmFtMTogXCJ2YWx1ZTFcIixcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9YTY3ZDU4MmZhNjFjYzUwNGM0YmFlNzFmMzM2Zjk4Yjk3ZjFlYTNjN2E2YmZlMWI2ZTQ1YWVjNzIwMTFiOWFlYlwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtdmFuaWxsYS1xdWVyeVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9NWZhMDBmYTMxNTUzYjczZWJmMTk0MjY3NmU4NjI5MWU4MzcyZmYyYTIyNjA5NTZkOWI4YWFlMWQ3NjNmYmYzMVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtdmFuaWxsYS1xdWVyeS1vcmRlci1rZXktY2FzZVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge1xuICAgICAgICBQYXJhbTI6IFwidmFsdWUyXCIsXG4gICAgICAgIFBhcmFtMTogXCJ2YWx1ZTFcIixcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9Yjk3ZDkxOGNmYTkwNGE1YmVmZjYxYzk4MmExYjZmNDU4Yjc5OTIyMTY0NmVmZDk5ZDMyMTllYzk0Y2RmMjUwMFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtdmFuaWxsYS1xdWVyeS11bnJlc2VydmVkXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIFwiLS5ffjAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI6XG4gICAgICAgICAgXCItLl9+MDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIixcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9OWMzZTU0YmZjZGYwYjE5NzcxYTdmNTIzZWU1NjY5Y2RmNTliYzdjYzA4ODQwMjcxNjdjMjFiYjE0M2E0MDE5N1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtdmFuaWxsYS11dGY4LXF1ZXJ5XCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIOGItDogXCJiYXJcIixcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9MmNkZWM4ZWVkMDk4NjQ5ZmYzYTExOWM5NDg1M2IxM2M2NDNiY2YwOGY4YjBhMWQ5MWUxMmM5MDI3ODE4ZGQwNFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwb3N0LWhlYWRlci1rZXktY2FzZVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTVkYTdjMWEyYWNkNTdjZWU3NTA1ZmM2Njc2ZTRlNTQ0NjIxYzMwODYyOTY2ZTM3ZGRkYjY4ZTkyZWZiZTVkNmJcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC1oZWFkZXIta2V5LXNvcnRcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJteS1oZWFkZXIxXCI6IFwidmFsdWUxXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDtteS1oZWFkZXIxO3gtYW16LWRhdGUsIFNpZ25hdHVyZT1jNTQxMDA1OWIwNGMxZWUwMDUzMDNhZWQ0MzBmNmU2NjQ1ZjYxZjRkYzllMTQ2MWVjOGY4OTE2ZmRmMTg4NTJjXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBvc3QtaGVhZGVyLXZhbHVlLWNhc2VcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJteS1oZWFkZXIxXCI6IFwiVkFMVUUxXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDtteS1oZWFkZXIxO3gtYW16LWRhdGUsIFNpZ25hdHVyZT1jZGJjOTgwMmUyOWQyOTQyZTVlMTBiNWJjY2ZkZDY3YzVmMjJjN2M0ZThhZTY3YjUzNjI5ZWZhNThiOTc0YjdkXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBvc3Qtc3RzLWhlYWRlci1hZnRlclwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTVkYTdjMWEyYWNkNTdjZWU3NTA1ZmM2Njc2ZTRlNTQ0NjIxYzMwODYyOTY2ZTM3ZGRkYjY4ZTkyZWZiZTVkNmJcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC1zdHMtaGVhZGVyLWJlZm9yZVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICAgIFwieC1hbXotc2VjdXJpdHktdG9rZW5cIjpcbiAgICAgICAgICBcIkFRb0RZWGR6RVBULy8vLy8vLy8vL3dFWEFNUExFdGM3NjRiTnJDOVNBUEJTTTIyd0RPazR4NEhJWjhqNEZaVHdkUVdMV3NLV0hHQnVGcXdBZU1pY1JYbXhmcFNQZkllb0lZUnFUZmxmS0Q4WVV1d3RoQXg3bVNFSS9xa1BwS1BpL2tNY0dkUXJtR2RlZWhNNElDMU50Qm1VcHAyd1VFOHBoVVphbXBLc2J1ckVEeTBLUGt5UURZd1Q3V1owd3E1VlNYRHZwNzVZVTlIRnZsUmQ4VHg2cTZmRThZUWNITlZYQWtpWTlxNmQreG8wckt3VDM4eFZxcjdaRDB1MGlQUGtVTDY0bElaYnFCQXorc2NxS21sem04RkRyeXBOQzlZamM4ZlBPTG45Rlg5S1NZdktUcjRydngzaVNJbFRKYWJJUXdqMklDQ1Ivb0x4QkE9PVwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O3gtYW16LWRhdGU7eC1hbXotc2VjdXJpdHktdG9rZW4sIFNpZ25hdHVyZT04NWQ5NjgyODExNWI1ZGMwY2ZjM2JkMTZhZDllMjEwZGQ3NzJiYmViYmEwNDE4MzZjNjQ1MzNhODJiZTA1ZWFkXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBvc3QtdmFuaWxsYVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTVkYTdjMWEyYWNkNTdjZWU3NTA1ZmM2Njc2ZTRlNTQ0NjIxYzMwODYyOTY2ZTM3ZGRkYjY4ZTkyZWZiZTVkNmJcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC12YW5pbGxhLWVtcHR5LXF1ZXJ5LXZhbHVlXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge1xuICAgICAgICBQYXJhbTE6IFwidmFsdWUxXCIsXG4gICAgICB9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTI4MDM4NDU1ZDZkZTE0ZWFmYzFmOTIyMmNmNWFhNmYxYTk2MTk3ZDdkZWI4MjYzMjcxZDQyMGQxMzhhZjdmMTFcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC12YW5pbGxhLXF1ZXJ5XCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge1xuICAgICAgICBQYXJhbTE6IFwidmFsdWUxXCIsXG4gICAgICB9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTI4MDM4NDU1ZDZkZTE0ZWFmYzFmOTIyMmNmNWFhNmYxYTk2MTk3ZDdkZWI4MjYzMjcxZDQyMGQxMzhhZjdmMTFcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC12YW5pbGxhLXF1ZXJ5LW5vbnVucmVzZXJ2ZWRcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIFwiQCMkJV5cIjogXCJcIixcbiAgICAgICAgXCIrXCI6ICcvLD8+PGBcIjs6XFxcXHxdW3t9JyxcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9NjZjODI2NTdjODZlMjZmYjI1MjM4ZDBlNjlmMDExZWRjNGM2ZGY1YWU3MTExOWQ3Y2I5OGVkOWI4NzM5M2MxZVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwb3N0LXZhbmlsbGEtcXVlcnktc3BhY2VcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIHA6IFwiXCIsXG4gICAgICB9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPWU3MTY4OGFkZGI1OGEyNjQxODYxNDA4NWZiNzMwYmEzZmFhNjIzYjQ2MWMxN2Y0OGYyZmJkYjkzNjFiOTRhOWJcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC14LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IFwiUGFyYW0xPXZhbHVlMVwiLFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWNvbnRlbnQtdHlwZTtob3N0O3gtYW16LWRhdGUsIFNpZ25hdHVyZT1mZjExODk3OTMyYWQzZjRlOGIxODEzNWQ3MjIwNTFlNWFjNDVmYzM4NDIxYjFkYTdiOWQxOTZhMGZlMDk0NzNhXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBvc3QteC13d3ctZm9ybS11cmxlbmNvZGVkLXBhcmFtZXRlcnNcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmOFwiLFxuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgYm9keTogXCJQYXJhbTE9dmFsdWUxXCIsXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9Y29udGVudC10eXBlO2hvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPTFhNzJlYzhmNjRiZDkxNGIwZTQyZTQyNjA3YzdmYmNlN2ZiMmM3NDY1ZjYzZTMwOTJiM2IwZDM5ZmE3N2E2ZmVcIixcbiAgfSxcbl07XG4iXX0=