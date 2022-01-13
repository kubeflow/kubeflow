export function getChunkedStream(source: AsyncIterable<Uint8Array>): AsyncIterable<Uint8Array> {
  let currentMessageTotalLength = 0;
  let currentMessagePendingLength = 0;
  let currentMessage: Uint8Array | null = null;
  let messageLengthBuffer: Uint8Array | null = null;
  const allocateMessage = (size: number) => {
    if (typeof size !== "number") {
      throw new Error("Attempted to allocate an event message where size was not a number: " + size);
    }
    currentMessageTotalLength = size;
    currentMessagePendingLength = 4;
    currentMessage = new Uint8Array(size);
    const currentMessageView = new DataView(currentMessage.buffer);
    currentMessageView.setUint32(0, size, false); //set big-endian Uint32 to 0~3 bytes
  };

  const iterator = async function* () {
    const sourceIterator = source[Symbol.asyncIterator]();
    while (true) {
      const { value, done } = await sourceIterator.next();
      if (done) {
        if (!currentMessageTotalLength) {
          return;
        } else if (currentMessageTotalLength === currentMessagePendingLength) {
          yield currentMessage as Uint8Array;
        } else {
          throw new Error("Truncated event message received.");
        }
        return;
      }

      const chunkLength = value.length;
      let currentOffset = 0;

      while (currentOffset < chunkLength) {
        // create new message if necessary
        if (!currentMessage) {
          // working on a new message, determine total length
          const bytesRemaining = chunkLength - currentOffset;
          // prevent edge case where total length spans 2 chunks
          if (!messageLengthBuffer) {
            messageLengthBuffer = new Uint8Array(4);
          }
          const numBytesForTotal = Math.min(
            4 - currentMessagePendingLength, // remaining bytes to fill the messageLengthBuffer
            bytesRemaining // bytes left in chunk
          );

          messageLengthBuffer.set(
            // @ts-ignore error TS2532: Object is possibly 'undefined' for value
            value.slice(currentOffset, currentOffset + numBytesForTotal),
            currentMessagePendingLength
          );

          currentMessagePendingLength += numBytesForTotal;
          currentOffset += numBytesForTotal;

          if (currentMessagePendingLength < 4) {
            // not enough information to create the current message
            break;
          }
          allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
          messageLengthBuffer = null;
        }

        // write data into current message
        const numBytesToWrite = Math.min(
          currentMessageTotalLength - currentMessagePendingLength, // number of bytes left to complete message
          chunkLength - currentOffset // number of bytes left in the original chunk
        );
        currentMessage!.set(
          // @ts-ignore error TS2532: Object is possibly 'undefined' for value
          value.slice(currentOffset, currentOffset + numBytesToWrite),
          currentMessagePendingLength
        );
        currentMessagePendingLength += numBytesToWrite;
        currentOffset += numBytesToWrite;

        // check if a message is ready to be pushed
        if (currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength) {
          // push out the message
          yield currentMessage as Uint8Array;
          // cleanup
          currentMessage = null;
          currentMessageTotalLength = 0;
          currentMessagePendingLength = 0;
        }
      }
    }
  };

  return {
    [Symbol.asyncIterator]: iterator,
  };
}
