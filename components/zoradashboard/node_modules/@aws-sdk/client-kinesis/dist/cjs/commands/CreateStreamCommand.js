"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStreamCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates a Kinesis data stream. A stream captures and transports data records that
 *             are continuously emitted from different data sources or <i>producers</i>.
 *             Scale-out within a stream is explicitly supported by means of shards, which are uniquely
 *             identified groups of data records in a stream.</p>
 *         <p>You specify and control the number of shards that a stream is composed of. Each
 *             shard can support reads up to five transactions per second, up to a maximum data read
 *             total of 2 MiB per second. Each shard can support writes up to 1,000 records per second,
 *             up to a maximum data write total of 1 MiB per second. If the amount of data input
 *             increases or decreases, you can add or remove shards.</p>
 *         <p>The stream name identifies the stream. The name is scoped to the AWS account used
 *             by the application. It is also scoped by AWS Region. That is, two streams in two
 *             different accounts can have the same name, and two streams in the same account, but in
 *             two different Regions, can have the same name.</p>
 *         <p>
 *             <code>CreateStream</code> is an asynchronous operation. Upon receiving a
 *                 <code>CreateStream</code> request, Kinesis Data Streams immediately returns and sets
 *             the stream status to <code>CREATING</code>. After the stream is created, Kinesis Data
 *             Streams sets the stream status to <code>ACTIVE</code>. You should perform read and write
 *             operations only on an <code>ACTIVE</code> stream. </p>
 *         <p>You receive a <code>LimitExceededException</code> when making a
 *                 <code>CreateStream</code> request when you try to do one of the following:</p>
 *         <ul>
 *             <li>
 *
 *                 <p>Have more than five streams in the <code>CREATING</code> state at any point
 *                     in time.</p>
 *             </li>
 *             <li>
 *
 *                 <p>Create more shards than are authorized for your account.</p>
 *             </li>
 *          </ul>
 *         <p>For the default shard limit for an AWS account, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/service-sizes-and-limits.html">Amazon Kinesis Data Streams
 *                 Limits</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>. To increase this limit, <a href="https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html">contact AWS
 *             Support</a>.</p>
 *         <p>You can use <code>DescribeStream</code> to check the stream status, which is
 *             returned in <code>StreamStatus</code>.</p>
 *         <p>
 *             <a>CreateStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
class CreateStreamCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "KinesisClient";
        const commandName = "CreateStreamCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1CreateStreamCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1CreateStreamCommand(output, context);
    }
}
exports.CreateStreamCommand = CreateStreamCommand;
//# sourceMappingURL=CreateStreamCommand.js.map