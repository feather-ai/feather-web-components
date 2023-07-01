export const jsonSyntaxHighlight = (json: string): string => {
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    function (match) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
};

export type EnvironmentType = {
  environment: "local" | "web";
};

export const ordinalSuffixOf = (i: number): string => {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};

export function getImageUrl(
  file: File,
  maxWidth: number | undefined = 512
): Promise<string> {
  return readOrientation(file).then((orientation) =>
    applyRotation(file, orientation || 1, maxWidth || 999999)
  );
}

/**
 * @returns EXIF orientation value (or undefined)
 */
const readOrientation = (file: File) =>
  new Promise<number | undefined>((resolve) => {
    const reader = new FileReader();

    reader.onload = () =>
      resolve(
        // @ts-ignore
        (() => {
          const view = new DataView(
            /** @type {ArrayBuffer} */ reader.result as ArrayBuffer
          );

          if (view.getUint16(0, false) != 0xffd8) {
            return;
          }

          const length = view.byteLength;

          let offset = 2;

          while (offset < length) {
            const marker = view.getUint16(offset, false);

            offset += 2;

            if (marker == 0xffe1) {
              offset += 2;

              if (view.getUint32(offset, false) != 0x45786966) {
                return;
              }

              offset += 6;

              const little = view.getUint16(offset, false) == 0x4949;

              offset += view.getUint32(offset + 4, little);

              const tags = view.getUint16(offset, little);

              offset += 2;

              for (let i = 0; i < tags; i++) {
                if (view.getUint16(offset + i * 12, little) == 0x0112) {
                  return view.getUint16(offset + i * 12 + 8, little);
                }
              }
            } else if ((marker & 0xff00) != 0xff00) {
              break;
            } else {
              offset += view.getUint16(offset, false);
            }
          }
        })()
      );

    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  });

/**
 * @returns Base64 Image URL (with rotation applied to compensate for orientation, if any)
 */
const applyRotation = (file: File, orientation: number, maxWidth: number) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const url = reader.result as string;

      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;

        let { width, height } = image;

        const [outputWidth, outputHeight] =
          orientation >= 5 && orientation <= 8
            ? [height, width]
            : [width, height];

        // const scale = outputWidth > maxWidth ? maxWidth / outputWidth : 1;
        const scale = 1.0;
        console.log("scale", scale);

        width = Math.floor(width * scale);
        height = Math.floor(height * scale);

        // to rotate rectangular image, we need enough space so square canvas is used
        const wh = Math.max(width, height);

        // set proper canvas dimensions before transform & export
        canvas.width = wh;
        canvas.height = wh;

        // for some transformations output image will be aligned to the right or bottom of square canvas
        let rightAligned = false;
        let bottomAligned = false;
        // transform context before drawing image
        switch (orientation) {
          case 2:
            context.transform(-1, 0, 0, 1, wh, 0);
            rightAligned = true;
            break;
          case 3:
            context.transform(-1, 0, 0, -1, wh, wh);
            rightAligned = true;
            bottomAligned = true;
            break;
          case 4:
            context.transform(1, 0, 0, -1, 0, wh);
            bottomAligned = true;
            break;
          case 5:
            context.transform(0, 1, 1, 0, 0, 0);
            break;
          case 6:
            context.transform(0, 1, -1, 0, wh, 0);
            rightAligned = true;
            break;
          case 7:
            context.transform(0, -1, -1, 0, wh, wh);
            rightAligned = true;
            bottomAligned = true;
            break;
          case 8:
            context.transform(0, -1, 1, 0, 0, wh);
            bottomAligned = true;
            break;
          default:
            break;
        }

        // draw image
        context.drawImage(image, 0, 0, width, height);

        // copy rotated image to output dimensions and export it
        const canvas2 = document.createElement("canvas");
        canvas2.width = Math.floor(outputWidth * scale);
        canvas2.height = Math.floor(outputHeight * scale);
        const ctx2 = canvas2.getContext("2d")!;
        const sx = rightAligned ? canvas.width - canvas2.width : 0;
        const sy = bottomAligned ? canvas.height - canvas2.height : 0;
        ctx2.drawImage(
          canvas,
          sx,
          sy,
          canvas2.width,
          canvas2.height,
          0,
          0,
          canvas2.width,
          canvas2.height
        );

        // export base64
        resolve(canvas2.toDataURL("image/jpeg"));
      };

      image.src = url;
    };

    reader.readAsDataURL(file);
  });

import { useEffect, useRef, useState } from "react";

type OnUpdateCallback<T> = (s: T) => void;
type SetStateUpdaterCallback<T> = (s: T) => T;
type SetStateAction<T> = (
  newState: T | SetStateUpdaterCallback<T>,
  callback?: OnUpdateCallback<T>
) => void;

export function useStateWithCallback<T>(init: T): [T, SetStateAction<T>];
export function useStateWithCallback<T = undefined>(
  init?: T
): [T | undefined, SetStateAction<T | undefined>];
export function useStateWithCallback<T>(init: T): [T, SetStateAction<T>] {
  const [state, setState] = useState<T>(init);
  const cbRef = useRef<OnUpdateCallback<T>>();

  const setCustomState: SetStateAction<T> = (newState, callback?): void => {
    cbRef.current = callback;
    setState(newState);
  };

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
    }
    cbRef.current = undefined;
  }, [state]);

  return [state, setCustomState];
}
