worker_processes 4

APP_PATH = "/home/ubuntu/zhihuishequ"
working_directory APP_PATH
#listen 8000
listen APP_PATH + "/tmp/unicorn.zhihuishequ.sock", :backlog => 64
pid APP_PATH + "/tmp/pids/unicorn.pid"
stderr_path APP_PATH + "/log/unicorn.stderr.log"
stdout_path APP_PATH + "/log/unicorn.stderr.log"