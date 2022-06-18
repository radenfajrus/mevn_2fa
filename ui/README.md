# ERROR

<code><pre>
$ vite
X [ERROR] Unexpected end of file

    ../package.json:1:0: ERROR: Unexpected end of file
</pre></code>
Solution : Its read package.json on parent dir. Make sure its not empty. set `{}` to avoid parse error  
