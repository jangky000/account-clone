# member
# : memno, uid, pw, mname, email, create_time

# Create
INSERT INTO member(uid, pw, mname, email, create_time) VALUES('user1', '1234', '사용자1', 'user1@gmail.com', NOW());
INSERT INTO member(uid, pw, mname, email, create_time) VALUES('user2', '1234', '사용자2', 'user2@gmail.com', NOW());

# List
SELECT memno, uid, pw, mname, email, create_time FROM member;

# Read
SELECT memno, uid, mname, email, create_time FROM member WHERE memno = 1;
SELECT memno, uid, mname, email, create_time FROM member WHERE uid = 'user1';

# pw check
SELECT pw FROM member WHERE uid = 'user1';

# Update
UPDATE member SET pw = '5678' WHERE uid = 'user2' AND pw = '1234';

# Delete
DELETE member WHERE memno = 1;
DELETE member WHERE uid = 'user2';





# category
# : cateno, catename, iemode

# Create
# 수입: 월급, 용돈, 기타 수입
# 지출: 식비, 생활, 쇼핑/뷰티, 교통, 의료/건강, 문화/여가, 미분류
INSERT INTO category(catename, iemode) VALUES('월급', 'I');
INSERT INTO category(catename, iemode) VALUES('용돈', 'I');
INSERT INTO category(catename, iemode) VALUES('기타 수입', 'I');

INSERT INTO category(catename, iemode) VALUES('식비', 'E');
INSERT INTO category(catename, iemode) VALUES('생활', 'E');
INSERT INTO category(catename, iemode) VALUES('쇼핑/뷰티', 'E');
INSERT INTO category(catename, iemode) VALUES('교통', 'E');
INSERT INTO category(catename, iemode) VALUES('의료/건강', 'E');
INSERT INTO category(catename, iemode) VALUES('문화/여가', 'E');
INSERT INTO category(catename, iemode) VALUES('미분류', 'E');

# List
SELECT cateno, catename, iemode FROM category;

# Read
SELECT cateno, catename, iemode FROM category WHERE iemode = 'I';
SELECT cateno, catename, iemode FROM category WHERE iemode = 'E';

# Update
# 관리자만
# UPDATE category SET catename='월 급여' WHERE cateno = 1;
# UPDATE category SET iemode='I' WHERE cateno = 1;

# Delete
# 관리자만
# DELETE category WHERE cateno = 1;


# pay_method
# : payno, payname, memno

# Create
INSERT INTO pay_method(payname, memno) VALUES ('현금', null);
INSERT INTO pay_method(payname, memno) VALUES ('현대카드', 1);
INSERT INTO pay_method(payname, memno) VALUES ('카카오체크카드', 1);
INSERT INTO pay_method(payname, memno) VALUES ('국민은행', 1);

# List
SELECT payno, payname, memno FROM pay_method WHERE memno = 1 OR memno IS NULL;

# Read

# Update
UPDATE pay_method SET payname = '현금' WHERE payno = 1 AND memno = 1;

# Delete
DELETE pay_method FROM payno = 1;