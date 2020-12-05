import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr

class EmailManager:
    @staticmethod
    def send_email(receiver, title, body, receiver_name):
        my_sender='no.reply.scrapper1@gmail.com'
        my_pass = 'Scrapper@2019'
        ret=True
        try:
            msg=MIMEText(body,'plain','utf-8')
            msg['From']=formataddr(["Scrapper2019", my_sender])
            msg['To']=formataddr([receiver_name, receiver])
            msg['Subject']= title

            server=smtplib.SMTP_SSL("smtp.gmail.com", 465)
            server.login(my_sender, my_pass)
            server.sendmail(my_sender, [receiver,], msg.as_string())
            server.quit()
        except Exception:
            ret=False
        print(ret)