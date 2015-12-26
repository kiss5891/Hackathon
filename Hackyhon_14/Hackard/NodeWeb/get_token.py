import urllib, json
from subprocess import call, check_output

root = 'http://localhost:9000/'
email = 'admin@example.com'
password = 'admin'

call(['curl', '-c', 'cookie.txt', root])
cookie = check_output(['tail', '-2', 'cookie.txt'])
cookie = cookie.split('\n')[0].split('\t')
cookie = cookie[len(cookie) - 1]
xsrf_token = urllib.unquote(cookie).decode('utf8') 

print json.loads(check_output([
    'curl',
    '--cookie', 'cookie.txt',
    root + 'auth/local',
    '-H', 'X-XSRF-TOKEN:' + xsrf_token,
    '-X', 'POST', '-d', 'email=' + email + '&password=' + password
]))['token']
