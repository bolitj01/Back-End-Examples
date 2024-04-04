from locust import TaskSet
from faker import Faker
import logging

fake = Faker()

class SharedTasks(TaskSet):
    def fetch_csrf_token(self):
        response = self.client.get("/api/user/get_csrf/")
        self.client.headers.update({"X-CSRFToken": response.text})

    def create_user(self):
        self.fetch_csrf_token()
        username = fake.user_name()
        password = fake.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
        with self.client.post("/api/user/create_user/", json={"username": username, "password": password}, catch_response=True) as response:
            logging.info(f"Response: {response.text}")
        with self.client.get("/api/user/logout/") as response:
            logging.info(f"Response: {response.text}")