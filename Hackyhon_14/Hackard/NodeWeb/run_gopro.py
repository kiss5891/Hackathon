from gopro import GoPro
camera = GoPro()
def fun():
    i=1000
    camera.locate('on')#beep
    while(i):
        i-=1
    camera.photo()
    i=1000
    while(i):
        i-=1
    camera.locate('off')

def saveLast():
  lastMedia = camera.media[len(camera.media)-1]
  lastMedia.save('./client/assets/images/photo.png')

fun()
saveLast()

#camera.delete_all()
#camera.delete_last()
#camera.sleep()
