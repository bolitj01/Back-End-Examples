from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=1000)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
    #Permission for the user to complete a Todo
    class Meta:
        permissions = [
            ("allow_toggle_complete", "Can toggle the todo checkbox"),
        ]