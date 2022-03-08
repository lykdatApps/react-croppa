# react-croppa

Simple React cropper component

## Usage

For image uploads

```ts
<Cropper
    imageUrl={URL.createObjectURL(file)}
    onCropComplete={(output: Blob) => {
        doSomethingWithCroppedImage(output)
    }}
    readyToUse={true | false}
/>
```
