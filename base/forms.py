from django.core.exceptions import ValidationError
from django.forms import widgets, fields
from django.core.validators import RegexValidator
from django import forms
from django.contrib.auth.models import User


class LoginForm(forms.Form):
    username = fields.CharField(
        required=True,
        widget=widgets.TextInput(attrs={'name':'username','id':'username','type':'text','placeholder': '用户名'}),
        strip=True,
        error_messages={'required': '用户名不能为空'},
    )   

    password = fields.CharField(
        widget=widgets.PasswordInput(attrs={'name':'password','id':'password','type':'password','placeholder': '请输入密码'},render_value=True),
        required=True,
        strip=True,
        error_messages={'required': '密码不能为空!'},
    )   

    def clean(self):
        if not self.is_valid():
            raise forms.ValidationError(u"用户名和密码为必填项")
        else:
            cleaned_data = super(LoginForm,self).clean()


class RegisterForm(forms.Form):
    username = fields.CharField(
        required=True,
        widget=widgets.TextInput(attrs={'class': "form-control",'placeholder': '用户名'}),
        strip=True,
        error_messages={'required': '用户名不能为空'},
    )
    email = fields.EmailField(
        required=True,
        widget=widgets.TextInput(attrs={'class': "form-control",'placeholder': '请输入邮箱'}),
        error_messages={'required': '邮箱不能为空','invalid':'请输入正确的邮箱格式'},
    )
    password = fields.CharField(
        widget=widgets.PasswordInput(attrs={'class': "form-control",'placeholder': '请输入密码'},render_value=True),
        required=True,
        strip=True,
        error_messages={'required': '密码不能为空!'},
    )
    confirm_password = fields.CharField(
        #render_value会对于PasswordInput，错误是否清空密码输入框内容，默认为清除，我改为不清楚
        widget=widgets.PasswordInput(attrs={'class': "form-control",'placeholder': '请再次输入密码!'},render_value=True),
        required=True,
        strip=True,
        error_messages={'required': '请再次输入密码!'}
    )