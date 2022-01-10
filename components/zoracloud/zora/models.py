from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


# Create your models here.

# class EphemeralCluster(models.Model):
#     """Ephemeral Cluster Models"""
#     default_kafka_version = "3.0.0"
#     default_number_of_replicas = 3
#
#     cluster_name = models.CharField(max_length=20, null=False, blank=False, unique=True)
#     version = models.CharField(max_length=7, default=default_kafka_version)
#     number_of_replicas = models.IntegerField(default=3)
#     offset_topic_replication_factor = models.IntegerField(default=3)
#     transaction_state_log_replication_factor = models.IntegerField(default=3)
#     transaction_state_log_min = models.IntegerField(default=3)
#     default_replication_factor = models.IntegerField(default=3)
#     min_insync_replicas = models.IntegerField(default=2)
#     inter_broker_protocol_version = models.CharField(max_length=7, default="3.0")
#     storage_type = models.CharField(max_length=15, default="ephemeral")
#     zookeeper_replicas = models.IntegerField(default=3)
#     last_update = models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.cluster_name
#
#     class Meta:
#         ordering = ['cluster_name']
#
#
# class VirtualService(models.Model):
#     """A model for Istio virtual service"""
#     name = models.CharField(max_length=50, unique=True)
#     namespace = models.CharField(max_length=50, )
#     gateway = models.CharField(max_length=255, default="kubeflow/kubeflow-gateway")
#     hosts = models.CharField(max_length=255, default="'*'")
#     uri = models.CharField(max_length=255, unique=True)
#     destination = models.CharField(max_length=255, unique=True)
#
#     def __str__(self):
#         return self.name
#
#     class Meta:
#         ordering = ['name']


class Profile(models.Model):
    MEMBERSHIP_BRONZE = 'B'
    MEMBERSHIP_SILVER = 'S'
    MEMBERSHIP_GOLD = 'G'

    MEMBERSHIP_CHOICES = [
        (MEMBERSHIP_BRONZE, 'Bronze'),
        (MEMBERSHIP_SILVER, 'Silver'),
        (MEMBERSHIP_GOLD, 'Gold'),
    ]
    company = models.CharField(max_length=255)
    cpu = models.IntegerField(default=1)
    memory = models.IntegerField(default=1)
    gpu = models.IntegerField(default=0)
    number_of_disks = models.IntegerField(default=1)
    phone = models.CharField(max_length=255)
    membership = models.CharField(max_length=1, choices=MEMBERSHIP_CHOICES, default=MEMBERSHIP_BRONZE)
    volume = models.IntegerField(default=1)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.company}{self.cpu}{self.memory}{self.gpu}{self.number_of_disks}{self.phone}{self.membership}{self.volume}{self.user}'

    class Meta:
        ordering = ['user__first_name', 'user__last_name']


class User(AbstractUser):
    email = models.EmailField(unique=True)


class ProvisionResponse(models.Model):
    # provision_request = models.CharField(max_length=255)
    provision_response = models.CharField(max_length=255)
