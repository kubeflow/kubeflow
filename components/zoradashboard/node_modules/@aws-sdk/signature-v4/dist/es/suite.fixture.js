export var region = "us-east-1";
export var service = "service";
export var credentials = {
    accessKeyId: "AKIDEXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",
};
export var signingDate = new Date("2015-08-30T12:36:00Z");
export var requests = [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdGUuZml4dHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdWl0ZS5maXh0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUM7QUFDbEMsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUNqQyxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUc7SUFDekIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsZUFBZSxFQUFFLDBDQUEwQztDQUM1RCxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLElBQU0sUUFBUSxHQUFvQjtJQUN2QztRQUNFLElBQUksRUFBRSwwQkFBMEI7UUFDaEMsT0FBTyxFQUFFO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFlBQVksRUFBRSxzQkFBc0I7Z0JBQ3BDLFlBQVksRUFBRSxrQkFBa0I7YUFDakM7WUFDRCxJQUFJLEVBQUUsR0FBRztTQUNWO1FBQ0QsYUFBYSxFQUNYLHVNQUF1TTtLQUMxTTtJQUNEO1FBQ0UsSUFBSSxFQUFFLDRCQUE0QjtRQUNsQyxPQUFPLEVBQUU7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsS0FBSztZQUNiLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsWUFBWSxFQUFFLHNCQUFzQjtnQkFDcEMsWUFBWSxFQUFFLGtCQUFrQjthQUNqQztZQUNELElBQUksRUFBRSxHQUFHO1NBQ1Y7UUFD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QUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLG1DQUFtQztnQkFDbkQsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsWUFBWSxFQUFFLGtCQUFrQjthQUNqQztZQUNELElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxHQUFHO1NBQ1Y7UUFDRCxhQUFhLEVBQ1gseU1BQXlNO0tBQzVNO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsdUNBQXVDO1FBQzdDLE9BQU8sRUFBRTtZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsaURBQWlEO2dCQUNqRSxJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixZQUFZLEVBQUUsa0JBQWtCO2FBQ2pDO1lBQ0QsSUFBSSxFQUFFLGVBQWU7WUFDckIsSUFBSSxFQUFFLEdBQUc7U0FDVjtRQUNELGFBQWEsRUFDWCx5TUFBeU07S0FDNU07Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFJlcXVlc3QgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUZXN0Q2FzZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWVzdDogSHR0cFJlcXVlc3Q7XG4gIGF1dGhvcml6YXRpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHJlZ2lvbiA9IFwidXMtZWFzdC0xXCI7XG5leHBvcnQgY29uc3Qgc2VydmljZSA9IFwic2VydmljZVwiO1xuZXhwb3J0IGNvbnN0IGNyZWRlbnRpYWxzID0ge1xuICBhY2Nlc3NLZXlJZDogXCJBS0lERVhBTVBMRVwiLFxuICBzZWNyZXRBY2Nlc3NLZXk6IFwid0phbHJYVXRuRkVNSS9LN01ERU5HK2JQeFJmaUNZRVhBTVBMRUtFWVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IHNpZ25pbmdEYXRlID0gbmV3IERhdGUoXCIyMDE1LTA4LTMwVDEyOjM2OjAwWlwiKTtcblxuZXhwb3J0IGNvbnN0IHJlcXVlc3RzOiBBcnJheTxUZXN0Q2FzZT4gPSBbXG4gIHtcbiAgICBuYW1lOiBcImdldC1oZWFkZXIta2V5LWR1cGxpY2F0ZVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwibXktaGVhZGVyMVwiOiBcInZhbHVlMix2YWx1ZTIsdmFsdWUxXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDtteS1oZWFkZXIxO3gtYW16LWRhdGUsIFNpZ25hdHVyZT1jOWQ1ZWE5ZjNmNzI4NTNhZWE4NTViNDdlYTg3MzgzMjg5MGRiZGQxODNiNDQ2OGY4NTgyNTk1MzFhNTEzOGVhXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdldC1oZWFkZXItdmFsdWUtbXVsdGlsaW5lXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJteS1oZWFkZXIxXCI6IFwidmFsdWUxLHZhbHVlMix2YWx1ZTNcIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O215LWhlYWRlcjE7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPWJhMTdiMzgzYTUzMTkwMTU0ZWI1ZmE2NmExYjgzNmNjMjk3Y2MwYTNkNzBhNWQwMDcwNTk4MDU3M2Q4ZmY3OTBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ2V0LWhlYWRlci12YWx1ZS1vcmRlclwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwibXktaGVhZGVyMVwiOiBcInZhbHVlNCx2YWx1ZTEsdmFsdWUzLHZhbHVlMlwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7bXktaGVhZGVyMTt4LWFtei1kYXRlLCBTaWduYXR1cmU9MDhjN2U1YTlhY2ZjZmViM2FiNmIyMTg1ZTc1Y2U4YjFkZWI1ZTYzNGVjNDc2MDFhNTA2NDNmODMwYzc1NWMwMVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtaGVhZGVyLXZhbHVlLXRyaW1cIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIm15LWhlYWRlcjFcIjogXCJ2YWx1ZTFcIixcbiAgICAgICAgXCJteS1oZWFkZXIyXCI6ICdcImEgICBiICAgY1wiJyxcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O215LWhlYWRlcjE7bXktaGVhZGVyMjt4LWFtei1kYXRlLCBTaWduYXR1cmU9YWNjM2VkM2FmYjYwYmIyOTBmYzhkMmRkMDA5OGI5OTExZmNhYTA1NDEyYjM2NzA1NWRlZTM1OTc1N2E5YzczNlwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtdW5yZXNlcnZlZFwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi8tLl9+MDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9MDdlZjc0OTRjNzZmYTQ4NTA4ODNlMmIwMDY2MDFmOTQwZjhhMzRkNDA0ZDBjZmE5NzdmNTJhNjViYmY1ZjI0ZlwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtdXRmOFwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi/hiLRcIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9ODMxODAxOGUwYjBmMjIzYWEyYmJmOTg3MDViNjJiYjc4N2RjOWMwZTY3OGYyNTVhODkxZmQwMzE0MWJlNWQ4NVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtdmFuaWxsYVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9NWZhMDBmYTMxNTUzYjczZWJmMTk0MjY3NmU4NjI5MWU4MzcyZmYyYTIyNjA5NTZkOWI4YWFlMWQ3NjNmYmYzMVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXQtdmFuaWxsYS1lbXB0eS1xdWVyeS1rZXlcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHtcbiAgICAgICAgUGFyYW0xOiBcInZhbHVlMVwiLFxuICAgICAgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O3gtYW16LWRhdGUsIFNpZ25hdHVyZT1hNjdkNTgyZmE2MWNjNTA0YzRiYWU3MWYzMzZmOThiOTdmMWVhM2M3YTZiZmUxYjZlNDVhZWM3MjAxMWI5YWViXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdldC12YW5pbGxhLXF1ZXJ5XCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O3gtYW16LWRhdGUsIFNpZ25hdHVyZT01ZmEwMGZhMzE1NTNiNzNlYmYxOTQyNjc2ZTg2MjkxZTgzNzJmZjJhMjI2MDk1NmQ5YjhhYWUxZDc2M2ZiZjMxXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdldC12YW5pbGxhLXF1ZXJ5LW9yZGVyLWtleS1jYXNlXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIFBhcmFtMjogXCJ2YWx1ZTJcIixcbiAgICAgICAgUGFyYW0xOiBcInZhbHVlMVwiLFxuICAgICAgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O3gtYW16LWRhdGUsIFNpZ25hdHVyZT1iOTdkOTE4Y2ZhOTA0YTViZWZmNjFjOTgyYTFiNmY0NThiNzk5MjIxNjQ2ZWZkOTlkMzIxOWVjOTRjZGYyNTAwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdldC12YW5pbGxhLXF1ZXJ5LXVucmVzZXJ2ZWRcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHtcbiAgICAgICAgXCItLl9+MDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjpcbiAgICAgICAgICBcIi0uX34wMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiLFxuICAgICAgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O3gtYW16LWRhdGUsIFNpZ25hdHVyZT05YzNlNTRiZmNkZjBiMTk3NzFhN2Y1MjNlZTU2NjljZGY1OWJjN2NjMDg4NDAyNzE2N2MyMWJiMTQzYTQwMTk3XCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdldC12YW5pbGxhLXV0ZjgtcXVlcnlcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHtcbiAgICAgICAg4Yi0OiBcImJhclwiLFxuICAgICAgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O3gtYW16LWRhdGUsIFNpZ25hdHVyZT0yY2RlYzhlZWQwOTg2NDlmZjNhMTE5Yzk0ODUzYjEzYzY0M2JjZjA4ZjhiMGExZDkxZTEyYzkwMjc4MThkZDA0XCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBvc3QtaGVhZGVyLWtleS1jYXNlXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9NWRhN2MxYTJhY2Q1N2NlZTc1MDVmYzY2NzZlNGU1NDQ2MjFjMzA4NjI5NjZlMzdkZGRiNjhlOTJlZmJlNWQ2YlwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwb3N0LWhlYWRlci1rZXktc29ydFwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIm15LWhlYWRlcjFcIjogXCJ2YWx1ZTFcIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O215LWhlYWRlcjE7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPWM1NDEwMDU5YjA0YzFlZTAwNTMwM2FlZDQzMGY2ZTY2NDVmNjFmNGRjOWUxNDYxZWM4Zjg5MTZmZGYxODg1MmNcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC1oZWFkZXItdmFsdWUtY2FzZVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIm15LWhlYWRlcjFcIjogXCJWQUxVRTFcIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O215LWhlYWRlcjE7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPWNkYmM5ODAyZTI5ZDI5NDJlNWUxMGI1YmNjZmRkNjdjNWYyMmM3YzRlOGFlNjdiNTM2MjllZmE1OGI5NzRiN2RcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC1zdHMtaGVhZGVyLWFmdGVyXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9NWRhN2MxYTJhY2Q1N2NlZTc1MDVmYzY2NzZlNGU1NDQ2MjFjMzA4NjI5NjZlMzdkZGRiNjhlOTJlZmJlNWQ2YlwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwb3N0LXN0cy1oZWFkZXItYmVmb3JlXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgICAgXCJ4LWFtei1zZWN1cml0eS10b2tlblwiOlxuICAgICAgICAgIFwiQVFvRFlYZHpFUFQvLy8vLy8vLy8vd0VYQU1QTEV0Yzc2NGJOckM5U0FQQlNNMjJ3RE9rNHg0SElaOGo0RlpUd2RRV0xXc0tXSEdCdUZxd0FlTWljUlhteGZwU1BmSWVvSVlScVRmbGZLRDhZVXV3dGhBeDdtU0VJL3FrUHBLUGkva01jR2RRcm1HZGVlaE00SUMxTnRCbVVwcDJ3VUU4cGhVWmFtcEtzYnVyRUR5MEtQa3lRRFl3VDdXWjB3cTVWU1hEdnA3NVlVOUhGdmxSZDhUeDZxNmZFOFlRY0hOVlhBa2lZOXE2ZCt4bzByS3dUMzh4VnFyN1pEMHUwaVBQa1VMNjRsSVpicUJBeitzY3FLbWx6bThGRHJ5cE5DOVlqYzhmUE9MbjlGWDlLU1l2S1RyNHJ2eDNpU0lsVEphYklRd2oySUNDUi9vTHhCQT09XCIsXG4gICAgICB9LFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSxcbiAgICBhdXRob3JpemF0aW9uOlxuICAgICAgXCJBV1M0LUhNQUMtU0hBMjU2IENyZWRlbnRpYWw9QUtJREVYQU1QTEUvMjAxNTA4MzAvdXMtZWFzdC0xL3NlcnZpY2UvYXdzNF9yZXF1ZXN0LCBTaWduZWRIZWFkZXJzPWhvc3Q7eC1hbXotZGF0ZTt4LWFtei1zZWN1cml0eS10b2tlbiwgU2lnbmF0dXJlPTg1ZDk2ODI4MTE1YjVkYzBjZmMzYmQxNmFkOWUyMTBkZDc3MmJiZWJiYTA0MTgzNmM2NDUzM2E4MmJlMDVlYWRcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC12YW5pbGxhXCIsXG4gICAgcmVxdWVzdDoge1xuICAgICAgcHJvdG9jb2w6IFwiaHR0cHM6XCIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaG9zdG5hbWU6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBxdWVyeToge30sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9NWRhN2MxYTJhY2Q1N2NlZTc1MDVmYzY2NzZlNGU1NDQ2MjFjMzA4NjI5NjZlMzdkZGRiNjhlOTJlZmJlNWQ2YlwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwb3N0LXZhbmlsbGEtZW1wdHktcXVlcnktdmFsdWVcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIFBhcmFtMTogXCJ2YWx1ZTFcIixcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9MjgwMzg0NTVkNmRlMTRlYWZjMWY5MjIyY2Y1YWE2ZjFhOTYxOTdkN2RlYjgyNjMyNzFkNDIwZDEzOGFmN2YxMVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwb3N0LXZhbmlsbGEtcXVlcnlcIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICBwcm90b2NvbDogXCJodHRwczpcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBob3N0bmFtZTogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIFBhcmFtMTogXCJ2YWx1ZTFcIixcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9MjgwMzg0NTVkNmRlMTRlYWZjMWY5MjIyY2Y1YWE2ZjFhOTYxOTdkN2RlYjgyNjMyNzFkNDIwZDEzOGFmN2YxMVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwb3N0LXZhbmlsbGEtcXVlcnktbm9udW5yZXNlcnZlZFwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHtcbiAgICAgICAgXCJAIyQlXlwiOiBcIlwiLFxuICAgICAgICBcIitcIjogJy8sPz48YFwiOzpcXFxcfF1be30nLFxuICAgICAgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgaG9zdDogXCJleGFtcGxlLmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgXCJ4LWFtei1kYXRlXCI6IFwiMjAxNTA4MzBUMTIzNjAwWlwiLFxuICAgICAgfSxcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1ob3N0O3gtYW16LWRhdGUsIFNpZ25hdHVyZT02NmM4MjY1N2M4NmUyNmZiMjUyMzhkMGU2OWYwMTFlZGM0YzZkZjVhZTcxMTE5ZDdjYjk4ZWQ5Yjg3MzkzYzFlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBvc3QtdmFuaWxsYS1xdWVyeS1zcGFjZVwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHtcbiAgICAgICAgcDogXCJcIixcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9ZTcxNjg4YWRkYjU4YTI2NDE4NjE0MDg1ZmI3MzBiYTNmYWE2MjNiNDYxYzE3ZjQ4ZjJmYmRiOTM2MWI5NGE5YlwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwb3N0LXgtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICBob3N0OiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICBcIngtYW16LWRhdGVcIjogXCIyMDE1MDgzMFQxMjM2MDBaXCIsXG4gICAgICB9LFxuICAgICAgYm9keTogXCJQYXJhbTE9dmFsdWUxXCIsXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICB9LFxuICAgIGF1dGhvcml6YXRpb246XG4gICAgICBcIkFXUzQtSE1BQy1TSEEyNTYgQ3JlZGVudGlhbD1BS0lERVhBTVBMRS8yMDE1MDgzMC91cy1lYXN0LTEvc2VydmljZS9hd3M0X3JlcXVlc3QsIFNpZ25lZEhlYWRlcnM9Y29udGVudC10eXBlO2hvc3Q7eC1hbXotZGF0ZSwgU2lnbmF0dXJlPWZmMTE4OTc5MzJhZDNmNGU4YjE4MTM1ZDcyMjA1MWU1YWM0NWZjMzg0MjFiMWRhN2I5ZDE5NmEwZmUwOTQ3M2FcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicG9zdC14LXd3dy1mb3JtLXVybGVuY29kZWQtcGFyYW1ldGVyc1wiLFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHByb3RvY29sOiBcImh0dHBzOlwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhvc3RuYW1lOiBcImV4YW1wbGUuYW1hem9uYXdzLmNvbVwiLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGY4XCIsXG4gICAgICAgIGhvc3Q6IFwiZXhhbXBsZS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgIFwieC1hbXotZGF0ZVwiOiBcIjIwMTUwODMwVDEyMzYwMFpcIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBcIlBhcmFtMT12YWx1ZTFcIixcbiAgICAgIHBhdGg6IFwiL1wiLFxuICAgIH0sXG4gICAgYXV0aG9yaXphdGlvbjpcbiAgICAgIFwiQVdTNC1ITUFDLVNIQTI1NiBDcmVkZW50aWFsPUFLSURFWEFNUExFLzIwMTUwODMwL3VzLWVhc3QtMS9zZXJ2aWNlL2F3czRfcmVxdWVzdCwgU2lnbmVkSGVhZGVycz1jb250ZW50LXR5cGU7aG9zdDt4LWFtei1kYXRlLCBTaWduYXR1cmU9MWE3MmVjOGY2NGJkOTE0YjBlNDJlNDI2MDdjN2ZiY2U3ZmIyYzc0NjVmNjNlMzA5MmIzYjBkMzlmYTc3YTZmZVwiLFxuICB9LFxuXTtcbiJdfQ==