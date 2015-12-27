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
fun()



#camera.delete_all()
#camera.delete_last()
#camera.sleep()
