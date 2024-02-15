from django_typomatic import ts_interface, generate_ts
from rest_framework import serializers


@ts_interface()
class Foo(serializers.Serializer):
    some_field = serializers.CharField()
    another_field = serializers.DateTimeField()


generate_ts('../frontend/backendTypes.ts')