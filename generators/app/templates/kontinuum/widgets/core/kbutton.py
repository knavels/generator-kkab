from kivymd.uix.button import Button
from ..base.kobject import KObject

class KButton(Button, KObject):
    def __init__(self, **kwargs):
        super(KButton, self).__init__(**kwargs)
        self.bind(on_press=self.button_clicked)

    def button_clicked(self, *args, **kwargs):
        pass