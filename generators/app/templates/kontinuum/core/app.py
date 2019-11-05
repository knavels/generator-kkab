from kivy.app import App
from kivymd.theming import ThemeManager

from kivy.lang import Builder

class KApp(App):
    theme_cls = ThemeManager()

    def __init(self, **kwargs):
        super(KApp, self).__init__(**kwargs)

    def build(self):
        layout = Builder.load_file('screens/main.kv')
        return layout

    pass