/* eslint-disable no-async-promise-executor */
const useConvertMimeType = () => {
  const filesToBase64 = (files) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        console.log(err);
        reject('');
      };
      reader.readAsDataURL(files);
    });
  };

  function base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {
      type: mime,
    });
  }

  const base64OrBlobToFiles = (resource, filename, mime, currentType) => {
    let blob = '';
    if (currentType === 'base64') {
      blob = resource.split(',')[1];
      blob = base64ToBlob(blob, mime);
    } else if (currentType === 'blob') {
      blob = resource;
    }
    return new File([blob], filename, {
      type: mime,
    });
  };
  const reduce_image_file_size = async (base64Str, MAX_WIDTH, MAX_HEIGHT) => {
    let resized_base64 = await new Promise((resolve) => {
      let img = new Image();
      img.onload = () => {
        let canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(function (blob) {
          resolve(blob);
        }, 'image/jpeg');
      };
      img.src = base64Str;
    });
    return resized_base64;
  };

  const process_image = (file, min_image_size, imgExtension) => {
    return new Promise(async (resolve, reject) => {
      const res = await filesToBase64(file);
      if (res) {
        const img = new Image();
        img.onload = async function () {
          if (file.size > min_image_size * (1024 * 1024)) {
            // startLoading('foto');
            let resized = await reduce_image_file_size(res, img.width, img.height);
            let percent = 5;
            while (
              base64OrBlobToFiles(resized, `img.${imgExtension}`, `image/${imgExtension}`, 'blob').size >
              min_image_size * (1024 * 1024)
            ) {
              resized = await reduce_image_file_size(
                res,
                img.width - (img.width * percent) / 100,
                img.height - (img.height * percent) / 100
              );
              percent += 5;
            }
            // stopLoading('foto');
            resolve(base64OrBlobToFiles(resized, `img.${imgExtension}`, `image/${imgExtension}`, 'blob'));
          } else {
            resolve(file);
          }
        };
        img.src = res;
      } else {
        reject('');
      }
    });
  };

  return { filesToBase64, base64OrBlobToFiles, base64ToBlob, reduce_image_file_size, process_image };
};

export default useConvertMimeType;
