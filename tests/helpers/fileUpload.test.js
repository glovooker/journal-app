import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
   cloud_name: 'blacks0ngbird',
   api_key: '113137912229357',
   api_secret: '_8IjCbFBBQyRyAZ821AoDPmko30',
   secure: true
});

describe('Tests on fileUpload', () => {

   test('should upload the file correctly to Cloudinary', async () => {

      const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
      const resp = await fetch(imageUrl);
      const blob = await resp.blob();

      const file = new File([blob], 'react.png');

      const url = await fileUpload(file);
      expect(typeof url).toBe('string');

      const segments = url.split('/');
      const imageId = segments[segments.length - 1].replace('.png', '');

      await cloudinary.api.delete_resources(['journal-app/' + imageId], {
         resource_type: 'image'
      });

   });

   test('should return null', async () => {

      const file = new File([], 'react.png');
      const url = await fileUpload(file);
      expect(url).toBe(null);

   });

});
