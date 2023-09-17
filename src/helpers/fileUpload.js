
export const fileUpload = async (file) => {

   // if (!file) throw new Error('No file selected');
   if (!file) return null;

   const cloudUrl = 'https://api.cloudinary.com/v1_1/blacks0ngbird/image/upload';

   const formData = new FormData();
   formData.append('upload_preset', 'react-journal-app');
   formData.append('file', file);

   try {

      const resp = await fetch(cloudUrl, {
         method: 'POST',
         body: formData
      });

      if (!resp.ok) throw new Error('Error uploading file');

      const cloudResp = await resp.json();

      return cloudResp.secure_url;

   } catch (error) {
      // console.log(error);
      // throw new Error(error.message);
      return null;
   }

};
