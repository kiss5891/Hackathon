 
def onUnlock():
    myo.rotSetCenter()
    myo.unlock("hold")

def onPoseEdge(pose, edge):
    print("pose: "+pose)
    if myo.title_contains("SignalSimulator"):
        while True:
            if (pose == 'fist') and (edge == 'on'): 
                print("Stop!!")
                myo.keyboard("up_arrow","press","")
                break
            elif (pose == 'fingersSpread') and (edge == 'on'):
                print("Run !!")
                myo.keyboard("down_arrow","press","")
                break
            elif (pose == 'doubleTap') and (edge == 'on'):
                print('Rest')
                myo.keyboard("left_arrow","press","")
                break
            break



