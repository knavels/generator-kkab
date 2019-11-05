from kontinuum.widgets.core.kbutton import KButton

class Button1(KButton):
    def button_clicked(self, *args, **kwargs):
        print('new things happens')