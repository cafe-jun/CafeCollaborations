# Application Layer

# Presentation Layer

presentation 에서 요청 dto를 하지않고 adapter 에서 별도로 한 이유는
presentation 에는 API Endpoint에 대한 데이터를 표한하기 위한 Layer이고
실제 application 으로 들어가기 위해서는 infra layer 에서 adapter로 연결을 해야한다
