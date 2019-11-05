from kivy.app import App

class KObject:

    def __init__(self, **kwargs):
        cls = f"{self.__class__.__name__}".lower()
        self.id = cls
        myApp = App.get_running_app()
        setattr(myApp, cls, self)