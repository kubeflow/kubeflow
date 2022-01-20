from django.contrib import admin
from . import models


@admin.register(models.KafkaCluster)
class KafkaCluster(admin.ModelAdmin):
    list_display = ["created_at", "name"]
    list_per_page = 10


@admin.register(models.KafkaTopic)
class KafkaTopic(admin.ModelAdmin):
    list_display = ["created_at", "name", "cluster", "partitions", "replicas", "retention", "segment"]
    list_per_page = 10


@admin.register(models.KafkaUser)
class KafkaUser(admin.ModelAdmin):
    list_display = ["created_at", "name", "cluster"]
    list_per_page = 10


@admin.register(models.KafkaBridge)
class KafkaUser(admin.ModelAdmin):
    list_display = ["created_at", "name", "cluster"]
    list_per_page = 10


@admin.register(models.KafkaVirtualService)
class KafkaVirtualService(admin.ModelAdmin):
    list_display = ["created_at", "name", "cluster"]
    list_per_page = 10


@admin.register(models.KafkaZookeeper)
class KafkaZookeeper(admin.ModelAdmin):
    # list_display = ["created_at", "name", "cluster"]
    list_per_page = 10


@admin.register(models.KafkaBroker)
class KafkaBroker(admin.ModelAdmin):
    # list_display = ["created_at", "name", "cluster"]
    list_per_page = 10


@admin.register(models.KafkaConfig)
class KafkaConfig(admin.ModelAdmin):
    # list_display = ["created_at", "name", "cluster"]
    list_per_page = 10


@admin.register(models.KafkaBrokerListeners)
class KafkaBrokerListeners(admin.ModelAdmin):
    # list_display = ["created_at", "name", "cluster"]
    list_per_page = 10
