// У������� schema ���ɣ��벻Ҫֱ���޸ĵ�ǰ�ļ��������Ҫ����uniCloud����̨�޸�schema
// uniCloud: https://unicloud.dcloud.net.cn/



export default {
  "user_name": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "content": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ]
  },
  "ip": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "create_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  }
}
