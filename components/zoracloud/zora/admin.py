from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
from . import models


# @admin.register(models.EphemeralCluster)
# class EphemeralClusterAdmin(admin.ModelAdmin):
#     list_display = ['cluster_name', 'version', 'number_of_replicas', 'offset_topic_replication_factor', 'storage_type',
#                     'zookeeper_replicas']
#
#
# @admin.register(models.VirtualService)
# class VirtualServicedmin(admin.ModelAdmin):
#     list_display = ['name', 'namespace', 'gateway', 'hosts', 'uri', 'destination']


@admin.register(models.Profile)
class Profile(admin.ModelAdmin):
    list_display = ['company', 'cpu', 'memory', 'gpu', 'number_of_disks', 'phone', 'membership', 'volume']
    list_per_page = 10
    list_select_related = ['user']
    ordering = ['user__first_name', 'user__last_name']
    search_fields = ['first_name__istartswith']


@admin.register(models.User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', "email", "first_name", "last_name"),
        }),
    )
