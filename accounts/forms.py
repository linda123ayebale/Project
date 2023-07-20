from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']
    
    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class':'form-control', 'placeholder':'Username','style':'background-color: rgb(211, 241, 147);border-radius: 10px'})
        self.fields['email'].widget.attrs.update({'class':'form-control', 'placeholder':'Email','style':'background-color: rgb(211, 241, 147); border-radius: 10px','required':'True'})
        self.fields['password1'].widget.attrs.update({'class':'form-control', 'placeholder':'Password','style':'background-color: rgb(211, 241, 147); border-radius: 10px'})
        self.fields['password2'].widget.attrs.update({'class':'form-control', 'placeholder':'Confirm Password','style':'background-color: rgb(211, 241, 147); border-radius: 10px'})

