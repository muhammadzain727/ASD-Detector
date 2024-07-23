from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Create your models here.



class MyUserManager(BaseUserManager):
    def create_user(self, email,name, is_doctor, password=None,password2=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            is_doctor=is_doctor
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, and password.
        """
        user = self.create_user(
            email,
            password=password,
            name="Admin",
            is_doctor=True
        )
        user.is_doctor = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    name=models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_doctor = models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name","is_doctor"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_doctor

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_doctor
    
    
class MachineLearningModel(models.Model):
    user=models.ForeignKey(MyUser,on_delete=models.CASCADE, related_name='Autism_Model')
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



class AsdBotModel(models.Model):
    user=models.ForeignKey(MyUser,on_delete=models.CASCADE, related_name='Autism_Bot')
    HumanMessage=models.TextField()
    AIMessage = models.TextField()
    chat_at = models.DateTimeField(auto_now_add=True)