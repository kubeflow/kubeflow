<#================================================================#|
 # A single commmand deployer script for Minikube with Kubeflow.
 # required-funcs(Input-Prompt)
|#================================================================#>
param($KUBEFLOW_VERSION = "master", [switch]$DetectBinaries)
# =======================================START=OF=COMPILER==========================================================|
#    The Following Code was added by AP-Compiler Version [1.2] To Make this program independent of AP-Core Engine
#    GitHub: https://github.com/avdaredevil/AP-Compiler
# ==================================================================================================================|
$Script:PSHell=$(if($PSHell){$PSHell}elseif($PSScriptRoot){$PSScriptRoot}else{"."});
iex ([System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("ZnVuY3Rpb24gQWRkLVRvUGF0aCB7cGFyYW0oW1ZhbGlkYXRlUGF0dGVybigiLi4qIildW1N0cmluZ10kRm9sZGVyID0gJFBXRCwgW0FsaWFzKCJwIiwicHJlIiwiYmFjayIpXVtzd2l0Y2hdJFByZXBlbmQsIFtTd2l0Y2hdJFNraXBDaGVjaykNCg0KICAgIGlmICghJFNraXBDaGVjaykge3RyeSB7JEZvbGRlciA9IFJlc29sdmUtUGF0aCAkRm9sZGVyIC1FcnJvckFjdGlvbiBTdG9wfSBjYXRjaCB7VGhyb3cgIltBUC1QYXRoOkFkZF0gRm9sZGVyIFskRm9sZGVyXSBEb2VzIG5vdCBFeGlzdCJ9fQ0KICAgIGlmIChUZXN0LVBhdGggJGZvbGRlciAtdHlwZSBsZWFmKSB7VGhyb3cgIltBUC1QYXRoOkFkZF0gSW5wdXQgWyRGb2xkZXJdIG11c3QgYmUgYSBmb2xkZXIhIn0NCiAgICBpZiAoJEZvbGRlciAtaW4gKEdldC1QYXRoKSkge3JldHVybn0NCiAgICBpZiAoISRQcmVwZW5kKSB7JEVudjpQYXRoICs9ICI7JEZvbGRlciJ9IGVsc2UgeyRFbnY6UGF0aCA9ICIkRm9sZGVyOyQoJEVudjpQYXRoKSJ9DQp9CgpmdW5jdGlvbiBJbnB1dC1Qcm9tcHQge3BhcmFtKFtWYWxpZGF0ZU5vdE51bGxvckVtcHR5KCldW1N0cmluZ10kUHJvbXB0ID0gIkVudGVyIFRleHQgOiAiKQ0KDQogICAgV3JpdGUtaG9zdCAtbm9uZXdsaW5lICRQcm9tcHQNCiAgICAkUmVSZWdYID0gJ1teXHgwMS1ceDA4XHgxMC1ceDgwXSsnIydbXlx3XC5dJyBb0JAt0Y/QgdGRXQ0KICAgICRUclN0cmluZyA9ICIiDQogICAgJGlQb3N4ID0gW0NvbnNvbGVdOjpDdXJzb3JMZWZ0DQogICAgJGlQb3N5ID0gW0NvbnNvbGVdOjpDdXJzb3JUb3ANCiAgICAkQ3ZpcyA9IFtDb25zb2xlXTo6Q3Vyc29yVmlzaWJsZQ0KICAgIFtDb25zb2xlXTo6Q3Vyc29yVmlzaWJsZSA9ICRGYWxzZQ0KICAgICRDb3VudCA9IDE7JFNsZWVwID0gMA0KICAgIFdoaWxlICgkVHJ1ZSkgew0KICAgICAgICBpZiAoJGNvdW50IC1ndCA1MDApIHskU2xlZXAgPSAxMDB9DQogICAgICAgIGlmICgkSG9zdC5VSS5SYXdVSS5LZXlBdmFpbGFibGUpIHskU3RvcmUgPSAkSG9zdC5VSS5SYXdVSS5SZWFkS2V5KCJJbmNsdWRlS2V5RG93bixOb0VjaG8iKTskQ291bnQ9MDskU2xlZXA9MH0gZWxzZSB7JENvdW50Kys7U3RhcnQtU2xlZXAgLW0gJFNsZWVwO2NvbnRpbnVlfQ0KICAgICAgICBpZiAoS2V5UHJlc3NlZCAifn5CYWNrU3BhY2V+fiIgJFN0b3JlKSB7aWYgKCRzdG9yZS5Db250cm9sS2V5U3RhdGUgLW1hdGNoICJjdHJsIikgeyRUclN0cmluZz0iIn0gZWxzZSB7JFRyU3RyaW5nID0gPzogKCRUclN0cmluZy5MZW5ndGggLWVxIDApeyIifXskVHJTdHJpbmcuc3Vic3RyaW5nKDAsJFRyU3RyaW5nLkxlbmd0aC0xKX19fQ0KICAgICAgICBlbHNlaWYgKEtleVByZXNzZWQgIn5+U3BhY2V+fiIgJFN0b3JlKSB7JFRyU3RyaW5nICs9ICIgIn0NCiAgICAgICAgZWxzZWlmIChLZXlQcmVzc2VkICJ+fkVzY2FwZX5+IiAkU3RvcmUpIHskVHJTdHJpbmc9IiI7YnJlYWt9DQogICAgICAgIGVsc2VpZiAoS2V5UHJlc3NlZCAifn5FTlRFUn5+IiAkU3RvcmUpIHtXcml0ZS1Ib3N0ICIiO2JyZWFrfSBlbHNlIA0KICAgICAgICB7JFRyU3RyaW5nICs9ICRTdG9yZS5DaGFyYWN0ZXIgLXJlcGxhY2UgKCRSZVJlZ1gsJycpfQ0KICAgICAgICAkd3QgPSBbQ29uc29sZV06OkJ1ZmZlcldpZHRoIC0gJGlQb3N4IC0gMQ0KICAgICAgICBbQ29uc29sZV06OkN1cnNvcmxlZnQgPSAkaVBvc3gNCiAgICAgICAgW0NvbnNvbGVdOjpDdXJzb3JUb3AgPSAkaVBvc3kNCiAgICAgICAgaWYgKCR3dC0kVHJTdHJpbmcuTGVuZ3RoIC1sdCAwKSB7DQogICAgICAgICAgICAkdGI9IiINCiAgICAgICAgICAgICR0dD0iLi4uIiskVHJTdHJpbmcuc3Vic3RyaW5nKCRUclN0cmluZy5MZW5ndGgtJHd0KzMpDQogICAgICAgIH0gZWxzZSB7DQogICAgICAgICAgICAkdGI9IiAiKigkd3QtJFRyU3RyaW5nLkxlbmd0aCkNCiAgICAgICAgICAgICR0dD0kVHJTdHJpbmcNCiAgICAgICAgfQ0KICAgICAgICAkZmNvbCA9IFtjb25zb2xlXTo6Rm9yZWdyb3VuZENvbG9yDQogICAgICAgIFdyaXRlLWhvc3QgLW5vbmV3bGluZSAtZiAkZkNvbCAkdHQkVGINCiAgICB9DQogICAgW0NvbnNvbGVdOjpDdXJzb3JWaXNpYmxlID0gJEN2aXMNCiAgICByZXR1cm4gJFRSU3RyaW5nDQp9CgpmdW5jdGlvbiBKUy1PUiB7Zm9yZWFjaCAoJGEgaW4gJGFyZ3MpIHtpZiAoISRhKSB7Y29udGludWV9O2lmICgkYS5HZXRUeXBlKCkuTmFtZSAtZXEgIlNjcmlwdEJsb2NrIikgeyRhID0gJGEuaW52b2tlKCk7aWYgKCEkYSl7Y29udGludWV9fTtyZXR1cm4gJGF9fQoKZnVuY3Rpb24gR2V0LVdoZXJlIHtwYXJhbShbUGFyYW1ldGVyKE1hbmRhdG9yeT0kdHJ1ZSldW3N0cmluZ10kRmlsZSwgW1N3aXRjaF0kQWxsKQ0KDQogICAgQVAtUmVxdWlyZSAiZGVwOndoZXJlIiB7dGhyb3cgIk5lZWQgU3lzMzJcd2hlcmUgdG8gd29yayEiO3JldHVybn0NCiAgICAkT3V0PSRudWxsDQogICAgaWYgKCRQU1ZlcnNpb25UYWJsZS5QbGF0Zm9ybSAtZXEgIlVuaXgiKSB7DQogICAgICAgICRPdXQgPSB3aGljaCAkZmlsZSAyPiRudWxsDQogICAgfSBlbHNlIHskT3V0ID0gd2hlcmUuZXhlICRmaWxlIDI+JG51bGx9DQogICAgDQogICAgaWYgKCEkT3V0KSB7cmV0dXJufQ0KICAgIGlmICgkQWxsKSB7cmV0dXJuICRPdXR9DQogICAgcmV0dXJuIEAoJE91dClbMF0NCn0KCmZ1bmN0aW9uIEFQLVJlcXVpcmUge3BhcmFtKFtQYXJhbWV0ZXIoTWFuZGF0b3J5PSRUcnVlKV1bQWxpYXMoIkZ1bmN0aW9uYWxpdHkiLCJMaWJyYXJ5IildW1N0cmluZ10kTGliLCBbU2NyaXB0QmxvY2tdJE9uRmFpbD17fSwgW1N3aXRjaF0kUGFzc1RocnUpDQoNCiAgICAkTG9hZE1vZHVsZSA9IHsNCiAgICAgICAgcGFyYW0oJEZpbGUsW2Jvb2xdJEltcG9ydCkNCiAgICAgICAgdHJ5IHtJbXBvcnQtTW9kdWxlICRGaWxlIC1lYSBzdG9wO3JldHVybiAxfSBjYXRjaCB7fQ0KICAgICAgICAkTGliPUFQLUNvbnZlcnRQYXRoICI8TElCPiI7JExGID0gIiRMaWJcJEZpbGUiDQogICAgICAgIFtzdHJpbmddJGYgPSBpZih0ZXN0LXBhdGggLXQgbGVhZiAkTEYpeyRMRn1lbHNlaWYodGVzdC1wYXRoIC10IGxlYWYgIiRMRi5kbGwiKXsiJExGLmRsbCJ9DQogICAgICAgIGlmICgkZiAtYW5kICRJbXBvcnQpIHtJbXBvcnQtTW9kdWxlICRmfQ0KICAgICAgICByZXR1cm4gJGYNCiAgICB9DQogICAgJFN0YXQgPSAkKHN3aXRjaCAtcmVnZXggKCRMaWIudHJpbSgpKSB7DQogICAgICAgICJeSW50ZXJuZXQiICAgICAgICAgICAgICAge3Rlc3QtY29ubmVjdGlvbiBnb29nbGUuY29tIC1Db3VudCAxIC1RdWlldH0NCiAgICAgICAgIl5kZXA6KC4qKSIgICAgICAgICAgICAgICB7aWYgKCRNYXRjaGVzWzFdIC1uZSAid2hlcmUiKXtBUC1SZXF1aXJlICJkZXA6d2hlcmUiIHskTU9ERT0yfX1lbHNleyRNT0RFPTJ9O2lmICgkTU9ERS0yKXtHZXQtV2hlcmUgJE1hdGNoZXNbMV19ZWxzZXt0cnl7JiAkTWF0Y2hlc1sxXSAiL2ZqZmRqZmRzIC0tZHNqYWhkaHMgLWRzamFkaiIgMj4kbnVsbDsic3VjYyJ9Y2F0Y2h7fX19DQogICAgICAgICJeKGxpYnxtb2R1bGUpOiguKikiICAgICAgeyRMb2FkTW9kdWxlLmludm9rZSgkTWF0Y2hlc1syXSwgJHRydWUpfQ0KICAgICAgICAiXihsaWJ8bW9kdWxlKV90ZXN0OiguKikiIHskTG9hZE1vZHVsZS5pbnZva2UoJE1hdGNoZXNbMl0pfQ0KICAgICAgICAiXmZ1bmN0aW9uOiguKikiICAgICAgICAgIHtnY20gJE1hdGNoZXNbMV0gLWVhIFNpbGVudGx5Q29udGludWV9DQogICAgICAgICJec3RyaWN0X2Z1bmN0aW9uOiguKikiICAge1Rlc3QtUGF0aCAiRnVuY3Rpb246XCQoJE1hdGNoZXNbMV0pIn0NCiAgICAgICAgZGVmYXVsdCB7V3JpdGUtQVAgIiFJbnZhbGlkIHNlbGVjdG9yIHByb3ZpZGVkIFskKCIkTGliIi5zcGxpdCgnOicpWzBdKV0iO3Rocm93ICdCQURfU0VMRUNUT1InfQ0KICAgIH0pDQogICAgaWYgKCEkU3RhdCkgeyRPbkZhaWwuSW52b2tlKCl9DQogICAgaWYgKCRQYXNzVGhydSkge3JldHVybiAkU3RhdH0NCn0KCmZ1bmN0aW9uIEV4dHJhY3QtWmlwIHtwYXJhbShbUGFyYW1ldGVyKE1hbmRhdG9yeT0kdHJ1ZSldJEZpbGUsICREZXN0PSIuIiwgW1ZhbGlkYXRlU2V0KCJPdmVyd3JpdGUiLCJTa2lwIiwiQXNrIildJENvcHlNb2RlPSJPdmVyd3JpdGUiLCBbU3dpdGNoXSRGb3JjZSwgW1N3aXRjaF0kU2lsZW50LCBbU3dpdGNoXSRQbGFpblRleHQsIFtTdHJpbmddJG1hdGNoPSIiKQ0KDQogICAgPzooVGVzdC1wYXRoICRGaWxlKXt9e1dyaXRlLUFQICIhRmlsZSBbJChTcGxpdC1QYXRoIC1sZWFmICRGaWxlKV0gRG9lc24ndCBFeGlzdCI7cmV0dXJufQ0KICAgIGlmICghKFRlc3QtcGF0aCAkRGVzdCkpIHtpZiAoJEZvcmNlKSB7bWQgJERlc3QgfCBPdXQtTnVsbH0gZWxzZSB7V3JpdGUtQVAgIiFEZXN0IGV4dHJhY3Rpb24gZm9sZGVyIERvZXNuJ3QgRXhpc3QiO3JldHVybn19DQogICAgJEZpbGUgPSBSZXNvbHZlLVBhdGggJEZpbGUNCiAgICAkRGVzdCA9IFJlc29sdmUtUGF0aCAkRGVzdA0KICAgICRTaCAgPSAobmV3LW9iamVjdCAtY29tIHNoZWxsLmFwcGxpY2F0aW9uKQ0KICAgICRaaXAgPSAkU2guTmFtZVNwYWNlKCIkRmlsZSIpDQogICAgJERzdCA9ICRTaC5OYW1lU3BhY2UoIiREZXN0IikNCiAgICAkQ29kZSA9IEB7Ik92ZXJ3cml0ZSI9MTsiU2tpcCI9MjsiQXNrIj0zfS4kQ29weU1vZGUNCiAgICAkU3RhdCA9IEAoIkV4dHJhY3RlZCIsIk92ZXJ3cm90ZSIsIlNraXBwZWQiLCJFeHRyYWN0ZWQiKQ0KICAgICRDZGQgID0gQCgweDQsKDB4NCAtYm9yIDB4MTApLDB4NCwwKQ0KICAgIGZvcmVhY2goJGkgaW4gKCR6aXAuaXRlbXMoKSB8ID8gbmFtZSAtbWF0Y2ggJG1hdGNoKSkgeyRXYXNIZXJlID0gJEZhbHNlDQogICAgICAgICRDdXJyZW50RmlsZT1Kb2luLVBhdGggJERlc3QgJGkuTmFtZQ0KICAgICAgICBpZiAoVGVzdC1QYXRoICRDdXJyZW50RmlsZSkgeyRXYXNIZXJlPSR0cnVlfQ0KICAgICAgICBzd2l0Y2ggKCRjb2RlKiRXYXNIZXJlKSB7DQogICAgICAgICAgICAwIHticmVha30NCiAgICAgICAgICAgIDEge3JtICRDdXJyZW50RmlsZTticmVha30NCiAgICAgICAgICAgIDIgeyRTa2lwPTE7YnJlYWt9DQogICAgICAgICAgICAzIHticmVha30NCiAgICAgICAgfQ0KICAgICAgICBpZiAoISRTa2lwKSB7JERzdC5jb3B5aGVyZSgkaSwkQ0REWyRDb2RlKiRXYXNIZXJlXSl9DQogICAgICAgIGlmICghJFNpbGVudCkge1dyaXRlLUFQICgiK3swfSBbJCgkaS5uYW1lKV0iIC1mICRTdGF0WyRDb2RlKiRXYXNIZXJlXSkgLVBsYWluVGV4dDokUGxhaW5UZXh0fQ0KICAgIH0NCn0KCmZ1bmN0aW9uIFdyaXRlLUFQIHsNCiAgICBbQ21kbGV0QmluZGluZygpXQ0KICAgIHBhcmFtKFtQYXJhbWV0ZXIoVmFsdWVGcm9tUGlwZWxpbmU9JHRydWUsIE1hbmRhdG9yeT0kVHJ1ZSldJFRleHQsW1N3aXRjaF0kTm9TaWduLFtTd2l0Y2hdJFBsYWluVGV4dCxbVmFsaWRhdGVTZXQoIkNlbnRlciIsIlJpZ2h0IiwiTGVmdCIpXVtTdHJpbmddJEFsaWduPSdMZWZ0JyxbU3dpdGNoXSRQYXNzVGhydSkNCiAgICBiZWdpbiB7JFRUID0gQCgpfQ0KICAgIFByb2Nlc3MgeyRUVCArPSAsJFRleHR9DQogICAgRU5EIHsNCiAgICAgICAgJEJsdWUgPSAkKGlmICgkV1JJVEVfQVBfTEVHQUNZX0NPTE9SUyl7M31lbHNleydCbHVlJ30pDQogICAgICAgIGlmICgkVFQuY291bnQgLWVxIDEpIHskVFQgPSAkVFRbMF19OyRUZXh0ID0gJFRUDQogICAgICAgIGlmICgkdGV4dC5jb3VudCAtZ3QgMSAtb3IgJHRleHQuR2V0VHlwZSgpLk5hbWUgLW1hdGNoICJcW1xdJCIpIHtyZXR1cm4gJFRleHQgfD97IiRfIn18ICUge1dyaXRlLUFQICRfIC1Ob1NpZ246JE5vU2lnbiAtUGxhaW5UZXh0OiRQbGFpblRleHQgLUFsaWduICRBbGlnbn19DQogICAgICAgIGlmICghJHRleHQgLW9yICR0ZXh0IC1ub3RtYXRjaCAiXigoPzxOTkw+eCl8KD88TlM+bnM/KSl7MCwyfSg/PHQ+XD4qKSg/PHM+WytcLSFcKlwjXEBfXSkoPzx3Pi4qKSIpIHtyZXR1cm4gJFRleHR9DQogICAgICAgICR0YiAgPSAiICAgICIqJE1hdGNoZXMudC5sZW5ndGg7DQogICAgICAgICRDb2wgPSBAeycrJz0nMic7Jy0nPScxMic7JyEnPScxNCc7JyonPSRCbHVlOycjJz0nRGFya0dyYXknOydAJz0nR3JheSc7J18nPSd3aGl0ZSd9WygkU2lnbiA9ICRNYXRjaGVzLlMpXQ0KICAgICAgICBpZiAoISRDb2wpIHtUaHJvdyAiSW5jb3JyZWN0IFNpZ24gWyRTaWduXSBQYXNzZWQhIn0NCiAgICAgICAgJFNpZ24gPSAkKGlmICgkTm9TaWduIC1vciAkTWF0Y2hlcy5OUykgeyIifSBlbHNlIHsiWyRTaWduXSAifSkNCiAgICAgICAgQVAtUmVxdWlyZSAiZnVuY3Rpb246QWxpZ24tVGV4dCIge2Z1bmN0aW9uIEdsb2JhbDpBbGlnbi1UZXh0KCRhbGlnbiwkdGV4dCkgeyR0ZXh0fX0NCiAgICAgICAgJERhdGEgPSAiJHRiJFNpZ24kKCRNYXRjaGVzLlcpIjtpZiAoISREYXRhKSB7cmV0dXJufQ0KICAgICAgICAkRGF0YSA9IEFsaWduLVRleHQgLUFsaWduICRBbGlnbiAiJHRiJFNpZ24kKCRNYXRjaGVzLlcpIg0KICAgICAgICBpZiAoJFBsYWluVGV4dCkge3JldHVybiAkRGF0YX0NCiAgICAgICAgV3JpdGUtSG9zdCAtTm9OZXdMaW5lOiQoW2Jvb2xdJE1hdGNoZXMuTk5MKSAtZiAkQ29sICREYXRhDQogICAgICAgIGlmICgkUGFzc1RocnUpIHskRGF0YX0NCiAgICB9DQp9CgpmdW5jdGlvbiBEb3dubG9hZC1GaWxlIHtwYXJhbShbUGFyYW1ldGVyKE1hbmRhdG9yeT0kdHJ1ZSldW1N0cmluZ10kVXJsLCBbQWxpYXMoIkYiLCJGb2xkZXIiKV1bU3RyaW5nXSRGaWxlPSImXl4mJioiLCBbU3dpdGNoXVtBbGlhcygiU2lsZW50IildJE11dGUsIFtWYWxpZGF0ZVNldCgnUHJvZ3Jlc3MtQmFyJywnU3RyZWFtJyldW3N0cmluZ10kUHJvZ3Jlc3NUeXBlPSdQcm9ncmVzcy1CYXInLCBbU3dpdGNoXSRTaG93UHJvZ3Jlc3MpDQoNCiAgICBpZiAoKCRGaWxlIC1lcSAiJl5eJiYqIikgLW9yICgkRmlsZS5zcGxpdCgiXCIpWy0xXS5zcGxpdCgiLiIpWzFdIC1lcSAiIikpIHsNCiAgICAgICAgJEZpbGUgKz0gIlwkKCRVcmwuc3BsaXQoIj8iKVswXS5zcGxpdCgiLyIpWy0xXSkiDQogICAgICAgICRGaWxlID0gJEZpbGUucmVwbGFjZSgiJl5eJiYqXCIsIiIpDQogICAgfQ0KICAgICRGaWxlID0gJEZpbGUucmVwbGFjZSgiLi5cIiwiJChSZXNvbHZlLVBhdGggIiRwd2RcLi4iKVwiKS5yZXBsYWNlKCIuXCIsIiRwd2RcIikucmVwbGFjZSgiXFwiLCJcIikNCiAgICBpZiAoKCRGaWxlLnNwbGl0KCJcIilbMF0gLW1hdGNoICI6IikgLW9yICgkRmlsZS5zdWJzdHJpbmcoMCwyKSAtZXEgIlxcIikpIHt9IGVsc2UgeyRGaWxlID0gIiRwd2RcJEZpbGUifQ0KICAgID86KCRNdXRlKXt9e1dyaXRlLUFQICIqRG93bmxvYWRpbmcgWyR1cmxdIjtXcml0ZS1BUCAiPipBcyBbJEZpbGVdIn0NCiAgICAkdXJpID0gTmV3LU9iamVjdCAiU3lzdGVtLlVyaSIgIiR1cmwiDQogICAgJHJlcXVlc3QgPSBbU3lzdGVtLk5ldC5IdHRwV2ViUmVxdWVzdF06OkNyZWF0ZSgkdXJpKQ0KICAgICRyZXF1ZXN0LnNldF9UaW1lb3V0KDE1MDAwKSAjMTUgc2Vjb25kIHRpbWVvdXQNCiAgICB0cnkgew0KICAgICAgICAkcG9zID0gW0NvbnNvbGVdOjpDdXJzb3JMZWZ0DQogICAgICAgICRyZXNwb25zZSA9ICRyZXF1ZXN0LkdldFJlc3BvbnNlKCkNCiAgICAgICAgJHRvdGFsTGVuZ3RoID0gJHJlc3BvbnNlLmdldF9Db250ZW50TGVuZ3RoKCkNCiAgICAgICAgJHJlc3BvbnNlU3RyZWFtID0gJHJlc3BvbnNlLkdldFJlc3BvbnNlU3RyZWFtKCkNCiAgICAgICAgJHRhcmdldFN0cmVhbSA9IE5ldy1PYmplY3QgLVR5cGVOYW1lIFN5c3RlbS5JTy5GaWxlU3RyZWFtIC1Bcmd1bWVudExpc3QgJEZpbGUsIENyZWF0ZQ0KICAgICAgICAkYnVmZmVyID0gbmV3LW9iamVjdCBieXRlW10gMTBLQg0KICAgICAgICAkY291bnQgPSAkcmVzcG9uc2VTdHJlYW0uUmVhZCgkYnVmZmVyLDAsJGJ1ZmZlci5sZW5ndGgpDQogICAgICAgICRkb3dubG9hZGVkQnl0ZXMgPSAkY291bnQNCiAgICAgICAgd2hpbGUgKCRjb3VudCAtZ3QgMCkgew0KICAgICAgICAgICAgaWYgKCRQcm9ncmVzc1R5cGUgLWVxICdTdHJlYW0nKSB7DQogICAgICAgICAgICAgICAgIkRvd25sb2FkZWQgJChTaXplLUFkaiAkZG93bmxvYWRlZEJ5dGVzKSBvZiAkKFNpemUtQWRqICR0b3RhbExlbmd0aCkiDQogICAgICAgICAgICB9IGVsc2Ugew0KICAgICAgICAgICAgICAgIHdyaXRlLXByb2dyZXNzIC1hY3Rpdml0eSAiRG93bmxvYWRpbmciIC1zdGF0dXMgIkZpbGUgIFskKCRGaWxlLnNwbGl0KCJcIilbLTFdKV0iIC1wZXJjZW50Y29tcGxldGUgKCRkb3dubG9hZGVkQnl0ZXMvJHRvdGFsTGVuZ3RoKjEwMCkNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgICR0YXJnZXRTdHJlYW0uV3JpdGUoJGJ1ZmZlciwgMCwgJGNvdW50KQ0KICAgICAgICAgICAgJGNvdW50ID0gJHJlc3BvbnNlU3RyZWFtLlJlYWQoJGJ1ZmZlciwwLCRidWZmZXIubGVuZ3RoKQ0KICAgICAgICAgICAgJGRvd25sb2FkZWRCeXRlcyA9ICRkb3dubG9hZGVkQnl0ZXMgKyAkY291bnQNCiAgICAgICAgfQ0KICAgICAgICBpZiAoISRNdXRlKSB7W0NvbnNvbGVdOjpXcml0ZUxpbmUoKTt3cml0ZS1BUCAiK0ZpbmlzaGVkIERvd25sb2FkaW5nIFskKCRGaWxlLnNwbGl0KCJcIilbLTFdKV0ifQ0KICAgICAgICAkdGFyZ2V0U3RyZWFtLkZsdXNoKCkNCiAgICAgICAgJHRhcmdldFN0cmVhbS5DbG9zZSgpDQogICAgICAgICR0YXJnZXRTdHJlYW0uRGlzcG9zZSgpDQogICAgICAgICRyZXNwb25zZVN0cmVhbS5EaXNwb3NlKCkNCiAgICB9IGNhdGNoIHsNCiAgICAgICAgaWYgKCEkTXV0ZSkge0NsZWFyLUxpbmV9O1dyaXRlLUFQICItRmFpbGVkIERvd25sb2FkaW5nIFskKCRGaWxlLnNwbGl0KCJcIilbLTFdKV0ge0Vycm9yOiAkKCgiJF8iLnNwbGl0KCI6IilbMS4uMTAwXSAtam9pbigiOiIpKS50cmltKCkpfSINCiAgICB9DQp9CgpmdW5jdGlvbiBQcm9tcHQtRmFsbGJhY2sge3BhcmFtKCRxLCAkZiwgW3NjcmlwdGJsb2NrXSRWYWxpZGF0b3IgPSB7cmV0dXJuIDF9KQ0KDQogICAgJHMgPSBAKCJueF8kcSIpDQogICAgaWYgKCRmKSB7JHMgKz0gIm54XyBbIiwibnghJGYiLCJueF9dIn0NCiAgICBXcml0ZS1BUCAkcw0KICAgICRwb3MgPSAoW0NvbnNvbGVdOjpDdXJzb3JMZWZ0KzIpLFtDb25zb2xlXTo6Q3Vyc29yVG9wDQogICAgJGEgPSAiIg0KICAgIGRvIHsNCiAgICAgICAgd2hpbGUoW0NvbnNvbGVdOjpDdXJzb3JUb3AgLWd0ICRQb3NbMV0pIHtDbGVhci1MaW5lO1tDb25zb2xlXTo6Q3Vyc29yVG9wLS07W0NvbnNvbGVdOjpDdXJzb3JMZWZ0ID0gW0NvbnNvbGVdOjpCdWZmZXJXaWR0aC0xfQ0KICAgICAgICB3aGlsZShbQ29uc29sZV06OkN1cnNvckxlZnQgLWd0ICRQb3NbMF0pIHsNCiAgICAgICAgICAgICRsZW4gPSBbQ29uc29sZV06OkN1cnNvckxlZnQgLSAkUG9zWzBdDQogICAgICAgICAgICBbQ29uc29sZV06OkN1cnNvckxlZnQgPSAkUG9zWzBdLTINCiAgICAgICAgICAgIFdyaXRlLUFQICJueF8kKCcgJyokbGVuKSINCiAgICAgICAgICAgIFtDb25zb2xlXTo6Q3Vyc29yTGVmdCA9ICRQb3NbMF0tMg0KICAgICAgICB9DQogICAgICAgICRzID0gSW5wdXQtUHJvbXB0ICI6ICINCiAgICAgICAgJGEgPSAkKGlmKCRzKXskc31lbHNleyRmfSkNCiAgICB9IHVudGlsICgkVmFsaWRhdG9yLkludm9rZSgkYSkpDQogICAgW0NvbnNvbGVdOjpDdXJzb3JMZWZ0LFtDb25zb2xlXTo6Q3Vyc29yVG9wID0gJFBvcztXcml0ZS1BUCAibiskYSINCiAgICBpZiAoW0NvbnNvbGVdOjpDdXJzb3JUb3AgLWVxICRQb3NbMV0pIHtXcml0ZS1Ib3N0ICIifQ0KICAgICRhDQp9CgpmdW5jdGlvbiBQcm9jZXNzLVRyYW5zcGFyZW5jeSB7cGFyYW0oW0FsaWFzKCJUcmFuc3BhcmVuY3kiLCJJbnZpc2liaWxpdHkiLCJpIiwidCIpXVtWYWxpZGF0ZVJhbmdlKDAsMTAwKV1baW50XSRUcmFucz0wLCBbUGFyYW1ldGVyKE1hbmRhdG9yeT0kVHJ1ZSldJFByb2Nlc3MpDQoNCiAgICBpZiAoJFByb2Nlc3MgLW1hdGNoICJcLmV4ZSQiKSB7JFByb2Nlc3MgPSAkUHJvY2Vzcy5yZXBsYWNlKCIuZXhlIiwiIil9DQogICAgVHJ5IHsNCiAgICAgICAgaWYgKCRQcm9jZXNzLm5hbWUpIHskUHJvYyA9ICRQcm9jZXNzLm5hbWV9IGVsc2UgeyRQcm9jID0gKEdldC1Qcm9jZXNzICRQcm9jZXNzIC1FcnJvckFjdGlvbiBTdG9wKVswXS5uYW1lfQ0KICAgIH0gY2F0Y2ggew0KICAgICAgICBpZiAoW0ludF06OlRyeVBhcnNlKCRQcm9jZXNzLCBbcmVmXTMpKSB7JFByb2MgPSAoKEdldC1Qcm9jZXNzIHwgPyB7JF8uSUQgLWVxICRQcm9jZXNzfSlbMF0pLm5hbWV9DQogICAgfQ0KICAgIGlmICgkUHJvYyAtbm90TWF0Y2ggIlwuZXhlJCIpIHskUHJvYyA9ICIkUHJvYy5leGUifQ0KICAgIG5pcmNtZCB3aW4gdHJhbnMgcHJvY2VzcyAiJFByb2MiICgoMTAwLSRUcmFucykqMjU1LzEwMCkgfCBPdXQtTnVsbA0KfQoKU2V0LUFsaWFzIGludiBQcm9jZXNzLVRyYW5zcGFyZW5jeQ==")))
# ========================================END=OF=COMPILER===========================================================|

if (!(Test-Path Function:\AP-Require)) {Write-Host -f Red "[-] This file has not been compiled, and will not be able to be run";exit}
AP-Require "dep:tar" {Write-AP "!Your windows OS / `$PATH needs to contain tar, you may choose to get it from Cygwin";exit}

$Script:MINIKUBE_CMD = "minikube start"
$Script:MOUNT_LOCAL = "false"

function Install-Dependencies {
    # Installing ksonnet if needed
    $KS_Version = ""
    if ($InstalledDeps.KS) {
        $KS_Version = ks version | ? {$_ -match "ksonnet version: (?<version>.+)"} | % {$Matches.version}
    }
    if (!$InstalledDeps.KS -or $KS_Version -ne "0.11.0") {
        Write-AP "x>!","nx_Installing ","nx!ksonnet","n_... $(if ($InstalledDeps.KS) {"Invalid Version ${$KS_Version} is installed"})"
        Download-File -Mute -ProgressType Stream "https://github.com/ksonnet/ksonnet/releases/download/v0.11.0/ks_0.11.0_windows_amd64.zip" ks.zip | Loading-Message "        Downloading" -CPB 200 -OutNull
        if (!(Test-Path ks.zip)) {throw 'Download for ksonnet failed'}
        Extract-Zip -CopyMode Overwrite ks.zip | Out-Null
        if (!(Test-Path ks_0.11.0_windows_amd64)) {throw 'Could not extract ksonnet installation files'}
        rm ks.zip
        Add-ToPath .\ks_0.11.0_windows_amd64
        Write-AP ">>+Installed"
    }

    # Installing kubectl if needed
    if (!$InstalledDeps.Kubectl) {
        Write-AP "x>!","nx_Installing ","n!kubectl"
        if ($Deps.GCloud) {
            Write-AP ">>*Using Strategy [GCloud]"
            gcloud components install kubectl
        } elseif ($Deps.Choco) {
            Write-AP ">>*Using Strategy [Chocolatey]"
            choco install kubernetes-cli
        } elseif ($Deps.PSGallery) {
            Write-AP ">>*Using Strategy [PSGallery]"
            Install-Script -Name install-kubectl -Scope CurrentUser -Force
            $scr = item .\install-kubectl.ps1 # Track the script object, in case the script navigates to other directories
            .\install-kubectl.ps1 -DownloadLocation (Join-Path $env:APPDATA "kubectl")
            rm $scr
        } else {
            throw "Cannot install Kubectl [You need either: gcloud OR chocolatey OR PSGallery-Commands]"
        }
        Write-AP ">>+Installed"
    }

    # Installing minikube if needed
    if (!$InstalledDeps.Minikube) {
        Write-AP "x>!","nx_Installing ","n!Minikube"
        if ($Deps.Choco) {
            Write-AP ">>*Using Strategy [Chocolatey]"
            choco install minikube
        } else {
            Write-AP ">>*Using Strategy [Github Release]"
            $Asset_URL = irm https://api.github.com/repos/kubernetes/minikube/releases/latest | % assets_url
            $Download = irm $Asset_URL | % {$_} | ? name -match "minikube-installer.exe" | % browser_download_url
            Download-File -Mute -ProgressType Stream $Download | Loading-Message "        Downloading" -CPB 200 -OutNull
            start -Wait .\minikube-installer.exe
        }
        Write-AP ">>+Installed"
    }
    Detect-CommonLocations # Rescan for installed applications
}
function ConvertFrom-Minikube {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory=$True,
                ValueFromPipeline=$True)]
                [object[]]$items,
        [int]$tab = 0
    )
    begin{}
    process {$items | % {"$_" -split "\r?\n"} | % {
        $Content = $_;$Sign = "_";$SignAP = '#'
        if ($_ -match "^(?<sign>[\?o\*\-@\>\!\+])   (?<content>\S.*)$") {
            $Sign = $Matches.sign
            $SignAP = JS-OR (@{'o'='*';'?'='!';'>'='>*'}[$Sign]) $sign
            $Content = $Matches.content
        }
        Write-AP "nx$('>'*$tab)#[minikube] ","n$SignAP[$Sign] $Content"
    }}
    end {}
}

function Cleanup_Deploy-Minikube {
    Write-AP "*Verifying dependencies"
    Install-Dependencies

    # Stop and delete previous existence of Minikube VM.
    Write-AP "*Cleaning old state of Minikube VM"
    $Minikube_Status = minikube status | ? {$_ -match 'minikube:'} | % {$_.split(' ')[1]}
    if ($Minikube_Status -eq "Running") {Write-AP ">*Stopping instances";minikube stop}
    minikube delete | ConvertFrom-Minikube -tab 1

    # start minikube with desired settings
    Write-AP "*Starting Minikube VM"
    (iex $Script:MINIKUBE_CMD) 2>&1 | ConvertFrom-Minikube -tab 1
    if (!$?) {
        Write-AP ">-Unable to start minikube. Please see errors above"
        return 1
    }
    $minikube_ip = ""
    (minikube ip | ? {$_} | % {$minikube_ip = $_}) 2>&1 | ConvertFrom-Minikube -tab 1
    if (!$minikube_ip) {throw "Minikube IP could not be detected"}
    Write-AP "+Minikube dashboard at http://${minikube_ip}:30000/"
}

function Infer-MinikubeSettings {
    Write-AP "*Setting up environment"
    $CPU = (Get-CimInstance Win32_ComputerSystem).NumberOfLogicalProcessors
    $RAM = (Get-WmiObject -class "win32_physicalmemory" -namespace "root\CIMV2" | measure Capacity -Sum | % Sum) / 1GB
    $Max_CPU = [Math]::Max(
        3,
        [Math]::Floor($CPU / 2)
    )
    $p = Prompt-Fallback "    Assign CPUs between 3..$Max_CPU" $Max_CPU -Validator {param($n)return ($a -ge 3) -and ($a -le $Max_CPU)}
    $Script:MINIKUBE_CMD += " --cpus $p"

    # memory
    if ($RAM -lt 16) {
        Write-AP ">!WARNING: Your system has low memory for an ML workload."
    }
    $MaxMem = [Math]::Min(8, ($RAM - 5))
    $r = Prompt-Fallback "    Assign memory (in GB) between 8..$MaxMem" ([Math]::Floor($RAM / 2)) -Validator {param($r)return $r -ge 8 -and $r -le $MaxMem}
    $Script:MINIKUBE_CMD += " --memory $($r * 1KB)"

    # disk
    $Disk = Get-WmiObject Win32_LogicalDisk | ? FreeSpace -gt 40 | sort Size -Descending | select -f 1
    if (!$Disk) {throw "There is no disk with enough space on this machine (Need >40GB free space)"}
    $MaxDisk = [Math]::Min(
        50,
        [Math]::Floor($Disk.FreeSpace / 2GB)
    )
    Write-AP "nx>_Assign disk space (in GB) in ","nx!$($Disk.DeviceId) "
    $d = Prompt-Fallback "between 40..$MaxDisk" $MaxDisk -Validator {param($r)return $r -ge 40 -and $r -le $MaxDisk}
    $Script:MINIKUBE_CMD += " --disk-size ${d}g"

    # virtualizer
    $opts = "hyperv,virtualbox,vmwarefusion".Split(",")
    $v = Prompt-Fallback "    Choose a virtualizer/hypervisor installed on your system ($($opts -join ','))" -Validator {param($s)return !$s -or $s -in $opts}
    if ($v) {
        $Script:MINIKUBE_CMD += " --vm-driver=$v"
        if ($v -eq 'hyperv') {
            Write-AP ">*Since you picked Hyper-V, you also need to specify the External Vswitch to use"
            Write-AP "n>>*Please follow instructions @ https://docs.docker.com/machine/drivers/hyper-v/"
            $sw = Prompt-Fallback "    Virtual Switch to use" -Validator {param($s)return "$s".trim() -match "."}
            $Script:MINIKUBE_CMD += " --hyperv-virtual-switch ""$sw"""
        }
    }

    # Mount local dir
    $l = Prompt-Fallback "    If you'd like to access a local directory in Jupyter, please enter the full path" -Validator {param($p)return !$p -or (Test-Path $p)}
    if ($l) {
        $Script:MINIKUBE_CMD += " --mount-string=${l}:/mnt/local --mount"
        $Script:MOUNT_LOCAL = "true"
    }
}

function Download-KubeflowSource {
    if ($KUBEFLOW_VERSION) {
        $KUBEFLOW_TAG = "v$KUBEFLOW_VERSION"
    }
    $KUBEFLOW_TAG = JS-OR $KUBEFLOW_TAG "master"
    Write-AP "*Downloading Kubeflow [$KUBEFLOW_TAG]"

    # Create a local copy of the Kubeflow source repo
    pushd $env:TEMP
    $TMPDIR = New-TemporaryFile | % {rm $_; md $_ -ea SilentlyContinue | Out-Null;$_}
    Download-File -Mute -ProgressType Stream "https://github.com/kubeflow/kubeflow/archive/${KUBEFLOW_TAG}.tar.gz" -File "kubeflow.tar.gz" | Loading-Message "        Downloading" -CPB 200 -OutNull
    tar -xzvf kubeflow.tar.gz
    # GitHub seems to strip out the v in the file name.
    $KUBEFLOW_SOURCE = ls -Directory | ? name -match "kubeflow" | select -f 1
    popd

    # Move over the directories we need
    "kubeflow","scripts","deployment" | % {mv "$KUBEFLOW_SOURCE/$_"}

    # Clean up
    rm -re -fo $TMPDIR
}

function Deploy-Kubeflow {
    Download-KubeflowSource
    remove-item -re -fo ./localapp -ea SilentlyContinue
    $env:KUBEFLOW_REPO = "$pwd MOUNT_LOCAL=$Script:MOUNT_LOCAL ./scripts/kfctl.sh init localapp --platform minikube"
    pushd localapp
    ../scripts/kfctl.sh generate all
    ../scripts/kfctl.sh apply all
    popd
}
function Detect-CommonLocations {
    if ($DetectBinaries) {Write-AP "*Scanning for installed components"}
    # If Ksonnet was installed in this directory, then add it to your path
    if (Test-Path ".\ks_0.11.0_windows_amd64") {
        Add-ToPath ".\ks_0.11.0_windows_amd64"
        if ($DetectBinaries) {Write-AP ">+Detected and added Ksonnet to PATH"}
    }
    $Minikube_Link = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Kubernetes\Minikube.lnk"
    if (Test-Path $Minikube_Link) {
        $sh = new-object -com wscript.shell
        $Minikube_Exe = $sh.CreateShortcut($Minikube_Link).TargetPath
        if (!(Test-Path $Minikube_Exe)) {
            throw "Minikube installed shortcut detected, but the path [$Minikube_Exe] does not exist"
        }
        Add-ToPath (Split-Path $Minikube_Exe)
        if ($DetectBinaries) {Write-AP ">+Detected and added Minikube to PATH"}
    }
}

# ======================================================|
# Scan Environment
Detect-CommonLocations
if ($DetectBinaries) {exit}
$InstalledDeps = @{
    KS = AP-Require "dep:ks" -PassThru
    Kubectl = AP-Require "dep:kubectl" -PassThru
    Minikube = AP-Require "dep:Minikube" -PassThru
    # Optional
    GCloud = AP-Require "dep:gcloud" -PassThru
    Choco = AP-Require "dep:choco" -PassThru
    PSGallery = AP-Require "function:Install-Script" -PassThru
}

# Main Method
try {
    Infer-MinikubeSettings
} catch {
    Write-AP "!Could not initialize environment because:",">@$_"
}
try {
    Cleanup_Deploy-Minikube
    sleep 30 # Give minikube time to take its first breath
    Deploy-Kubeflow
} catch {
    Write-AP "!Could not deploy Minikube because:",">@$_"
}
