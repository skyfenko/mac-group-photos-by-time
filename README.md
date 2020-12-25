# Group photos and videos exported by Photos on Mac by time (by year, month, day)

## Intention
Have you even experience this feeling when you want to export photos from Photos app on Mac and it creates a mess on your SSD?
Literally, it puts all the moments from your Photo Library in to the same folder. Well, what next?, you asked. 
You can either give up or put them manually year by year, month by month, day by day. 
Actually, second option works, unless you have exported media over several years with over 10K.
So, primarily, the intention is to save time doing that quickly.

## How to run
- Visit index.js and change path pointing to the folder with media on your computer
- set locale, otherwise, English will be used by default
- set date format of folders where your media is stored. By default, it is 'DD MMMM YYYY', which is 25 December 2020 
  
Run and check your folder. The subfolders have to be arranged properly.

    node index.js

