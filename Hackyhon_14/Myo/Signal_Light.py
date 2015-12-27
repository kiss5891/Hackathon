import time
import sys
from PyQt4 import QtGui
from PyQt4 import QtCore

class LightSign(QtGui.QWidget):
    
    def __init__(self):
        super(LightSign, self).__init__()
        self.vhSwitch = 0
        self.initUI()
        
    def initUI(self):
        
        self.vLabel = QtGui.QLabel('Vertical', self)
        self.vLabel.move(40,20)
        self.vLight = QtGui.QFrame(self)
        self.vLight.setGeometry(20,40,100,100)
        self.vLight.setStyleSheet("QWidget {background-color:grey}")
        
        self.hLabel = QtGui.QLabel('Horizon', self)
        self.hLabel.move(220,20)
        self.hLight = QtGui.QFrame(self)
        self.hLight.setGeometry(200,40,100,100)
        self.hLight.setStyleSheet("QWidget {background-color:grey}")

        self.setWindowTitle('SignalSimulator')    
        self.show()
        
    def keyPressEvent(self,event):
        key = event.key()
        if key == QtCore.Qt.Key_Down:
            if self.vhSwitch == 0:
                self.vLight.setStyleSheet("QWidget {background-color:green}")
                self.hLight.setStyleSheet("QWidget {background-color:red}")
                self.vhSwitch = 1
            else:
                self.vLight.setStyleSheet("QWidget {background-color:red}")
                self.hLight.setStyleSheet("QWidget {background-color:green}")
                self.vhSwitch = 0
        elif key == QtCore.Qt.Key_Up:
            self.vLight.setStyleSheet("QWidget {background-color:red}")
            self.hLight.setStyleSheet("QWidget {background-color:red}")
        elif key == QtCore.Qt.Key_Left:
            self.vLight.setStyleSheet("QWidget {background-color:grey}")
            self.hLight.setStyleSheet("QWidget {background-color:grey}")

def main():
    
    app = QtGui.QApplication(sys.argv)
    appUI = LightSign()
    sys.exit(app.exec_())


if __name__ == '__main__':
    main()
