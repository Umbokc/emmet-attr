# emmet attr
.htaccess
```
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*\.css)$ $1.php [NC,L,QSA]
    RewriteRule ^(.*\.js)$ $1.php [NC,L,QSA]
</IfModule>
```

