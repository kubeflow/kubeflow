import { RekognitionClient } from "../RekognitionClient";
import {
  DescribeProjectVersionsCommand,
  DescribeProjectVersionsCommandInput,
} from "../commands/DescribeProjectVersionsCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (
  client: RekognitionClient,
  input: DescribeProjectVersionsCommandInput
): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new DescribeProjectVersionsCommand(input));
    try {
      let returnComparator = () => {
        let flat_1: any[] = [].concat(...result.ProjectVersionDescriptions);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      let allStringEq_5 = returnComparator().length > 0;
      for (let element_4 of returnComparator()) {
        allStringEq_5 = allStringEq_5 && element_4 == "RUNNING";
      }
      if (allStringEq_5) {
        return { state: WaiterState.SUCCESS };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        let flat_1: any[] = [].concat(...result.ProjectVersionDescriptions);
        let projection_3 = flat_1.map((element_2: any) => {
          return element_2.Status;
        });
        return projection_3;
      };
      for (let anyStringEq_4 of returnComparator()) {
        if (anyStringEq_4 == "FAILED") {
          return { state: WaiterState.FAILURE };
        }
      }
    } catch (e) {}
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 * Wait until the ProjectVersion is running.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeProjectVersionsCommand for polling.
 */
export const waitForProjectVersionRunning = async (
  params: WaiterConfiguration<RekognitionClient>,
  input: DescribeProjectVersionsCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
