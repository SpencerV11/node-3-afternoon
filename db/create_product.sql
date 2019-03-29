insert into product (
    name,
    image_url,
    price,
    description
) values (
    $1,
    $2,
    $3,
    $4
);

select * from product;