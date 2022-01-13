import {
  AbsoluteLocation,
  DeserializeHandler,
  Handler,
  HandlerExecutionContext,
  HandlerOptions,
  MiddlewareStack,
  MiddlewareType,
  Pluggable,
  Priority,
  RelativeLocation,
  Step,
} from "@aws-sdk/types";

import { AbsoluteMiddlewareEntry, MiddlewareEntry, Normalized, RelativeMiddlewareEntry } from "./types";

export const constructStack = <Input extends object, Output extends object>(): MiddlewareStack<Input, Output> => {
  let absoluteEntries: AbsoluteMiddlewareEntry<Input, Output>[] = [];
  let relativeEntries: RelativeMiddlewareEntry<Input, Output>[] = [];
  const entriesNameSet: Set<string> = new Set();

  const sort = <T extends AbsoluteMiddlewareEntry<Input, Output>>(entries: T[]): T[] =>
    entries.sort(
      (a, b) =>
        stepWeights[b.step] - stepWeights[a.step] ||
        priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]
    );

  const removeByName = (toRemove: string): boolean => {
    let isRemoved = false;
    const filterCb = (entry: MiddlewareEntry<Input, Output>): boolean => {
      if (entry.name && entry.name === toRemove) {
        isRemoved = true;
        entriesNameSet.delete(toRemove);
        return false;
      }
      return true;
    };
    absoluteEntries = absoluteEntries.filter(filterCb);
    relativeEntries = relativeEntries.filter(filterCb);
    return isRemoved;
  };

  const removeByReference = (toRemove: MiddlewareType<Input, Output>): boolean => {
    let isRemoved = false;
    const filterCb = (entry: MiddlewareEntry<Input, Output>): boolean => {
      if (entry.middleware === toRemove) {
        isRemoved = true;
        if (entry.name) entriesNameSet.delete(entry.name);
        return false;
      }
      return true;
    };
    absoluteEntries = absoluteEntries.filter(filterCb);
    relativeEntries = relativeEntries.filter(filterCb);
    return isRemoved;
  };

  const cloneTo = <InputType extends Input, OutputType extends Output>(
    toStack: MiddlewareStack<InputType, OutputType>
  ): MiddlewareStack<InputType, OutputType> => {
    absoluteEntries.forEach((entry) => {
      //@ts-ignore
      toStack.add(entry.middleware, { ...entry });
    });
    relativeEntries.forEach((entry) => {
      //@ts-ignore
      toStack.addRelativeTo(entry.middleware, { ...entry });
    });
    return toStack;
  };

  const expandRelativeMiddlewareList = (
    from: Normalized<MiddlewareEntry<Input, Output>, Input, Output>
  ): MiddlewareEntry<Input, Output>[] => {
    const expandedMiddlewareList: MiddlewareEntry<Input, Output>[] = [];
    from.before.forEach((entry) => {
      if (entry.before.length === 0 && entry.after.length === 0) {
        expandedMiddlewareList.push(entry);
      } else {
        expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
      }
    });
    expandedMiddlewareList.push(from);
    from.after.reverse().forEach((entry) => {
      if (entry.before.length === 0 && entry.after.length === 0) {
        expandedMiddlewareList.push(entry);
      } else {
        expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
      }
    });
    return expandedMiddlewareList;
  };

  /**
   * Get a final list of middleware in the order of being executed in the resolved handler.
   */
  const getMiddlewareList = (): Array<MiddlewareType<Input, Output>> => {
    const normalizedAbsoluteEntries: Normalized<AbsoluteMiddlewareEntry<Input, Output>, Input, Output>[] = [];
    const normalizedRelativeEntries: Normalized<RelativeMiddlewareEntry<Input, Output>, Input, Output>[] = [];
    const normalizedEntriesNameMap: {
      [middlewareName: string]: Normalized<MiddlewareEntry<Input, Output>, Input, Output>;
    } = {};

    absoluteEntries.forEach((entry) => {
      const normalizedEntry = {
        ...entry,
        before: [],
        after: [],
      };
      if (normalizedEntry.name) normalizedEntriesNameMap[normalizedEntry.name] = normalizedEntry;
      normalizedAbsoluteEntries.push(normalizedEntry);
    });

    relativeEntries.forEach((entry) => {
      const normalizedEntry = {
        ...entry,
        before: [],
        after: [],
      };
      if (normalizedEntry.name) normalizedEntriesNameMap[normalizedEntry.name] = normalizedEntry;
      normalizedRelativeEntries.push(normalizedEntry);
    });

    normalizedRelativeEntries.forEach((entry) => {
      if (entry.toMiddleware) {
        const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
        if (toMiddleware === undefined) {
          throw new Error(
            `${entry.toMiddleware} is not found when adding ${entry.name || "anonymous"} middleware ${entry.relation} ${
              entry.toMiddleware
            }`
          );
        }
        if (entry.relation === "after") {
          toMiddleware.after.push(entry);
        }
        if (entry.relation === "before") {
          toMiddleware.before.push(entry);
        }
      }
    });

    const mainChain = sort(normalizedAbsoluteEntries)
      .map(expandRelativeMiddlewareList)
      .reduce((wholeList, expendedMiddlewareList) => {
        // TODO: Replace it with Array.flat();
        wholeList.push(...expendedMiddlewareList);
        return wholeList;
      }, [] as MiddlewareEntry<Input, Output>[]);
    return mainChain.map((entry) => entry.middleware);
  };

  const stack = {
    add: (middleware: MiddlewareType<Input, Output>, options: HandlerOptions & AbsoluteLocation = {}) => {
      const { name, override } = options;
      const entry: AbsoluteMiddlewareEntry<Input, Output> = {
        step: "initialize",
        priority: "normal",
        middleware,
        ...options,
      };
      if (name) {
        if (entriesNameSet.has(name)) {
          if (!override) throw new Error(`Duplicate middleware name '${name}'`);
          const toOverrideIndex = absoluteEntries.findIndex((entry) => entry.name === name);
          const toOverride = absoluteEntries[toOverrideIndex];
          if (toOverride.step !== entry.step || toOverride.priority !== entry.priority) {
            throw new Error(
              `"${name}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be ` +
                `overridden by same-name middleware with ${entry.priority} priority in ${entry.step} step.`
            );
          }
          absoluteEntries.splice(toOverrideIndex, 1);
        }
        entriesNameSet.add(name);
      }
      absoluteEntries.push(entry);
    },

    addRelativeTo: (middleware: MiddlewareType<Input, Output>, options: HandlerOptions & RelativeLocation) => {
      const { name, override } = options;
      const entry: RelativeMiddlewareEntry<Input, Output> = {
        middleware,
        ...options,
      };
      if (name) {
        if (entriesNameSet.has(name)) {
          if (!override) throw new Error(`Duplicate middleware name '${name}'`);
          const toOverrideIndex = relativeEntries.findIndex((entry) => entry.name === name);
          const toOverride = relativeEntries[toOverrideIndex];
          if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
            throw new Error(
              `"${name}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden ` +
                `by same-name middleware ${entry.relation} "${entry.toMiddleware}" middleware.`
            );
          }
          relativeEntries.splice(toOverrideIndex, 1);
        }
        entriesNameSet.add(name);
      }
      relativeEntries.push(entry);
    },

    clone: () => cloneTo(constructStack<Input, Output>()),

    use: (plugin: Pluggable<Input, Output>) => {
      plugin.applyToStack(stack);
    },

    remove: (toRemove: MiddlewareType<Input, Output> | string): boolean => {
      if (typeof toRemove === "string") return removeByName(toRemove);
      else return removeByReference(toRemove);
    },

    removeByTag: (toRemove: string): boolean => {
      let isRemoved = false;
      const filterCb = (entry: MiddlewareEntry<Input, Output>): boolean => {
        const { tags, name } = entry;
        if (tags && tags.includes(toRemove)) {
          if (name) entriesNameSet.delete(name);
          isRemoved = true;
          return false;
        }
        return true;
      };
      absoluteEntries = absoluteEntries.filter(filterCb);
      relativeEntries = relativeEntries.filter(filterCb);
      return isRemoved;
    },

    concat: <InputType extends Input, OutputType extends Output>(
      from: MiddlewareStack<InputType, OutputType>
    ): MiddlewareStack<InputType, OutputType> => {
      const cloned = cloneTo(constructStack<InputType, OutputType>());
      cloned.use(from);
      return cloned;
    },

    applyToStack: cloneTo,

    resolve: <InputType extends Input, OutputType extends Output>(
      handler: DeserializeHandler<InputType, OutputType>,
      context: HandlerExecutionContext
    ): Handler<InputType, OutputType> => {
      for (const middleware of getMiddlewareList().reverse()) {
        handler = middleware(handler as Handler<Input, OutputType>, context) as any;
      }
      return handler as Handler<InputType, OutputType>;
    },
  };
  return stack;
};

const stepWeights: { [key in Step]: number } = {
  initialize: 5,
  serialize: 4,
  build: 3,
  finalizeRequest: 2,
  deserialize: 1,
};

const priorityWeights: { [key in Priority]: number } = {
  high: 3,
  normal: 2,
  low: 1,
};
