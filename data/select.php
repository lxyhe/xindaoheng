<?php
	header("Contect-Type:application/json");
	$pno=$_REQUEST['pno'];//要显示哪一页的记录
	$pager = [
  'recordCount'=>0,			//总记录数
  'pageSize'=>9,			//页面大小
  'pageCount'=>0,			//总页数
  'currentPage'=>intval($pno), //当前页号
  'data'=>null				//当前页数据
	];
	 $conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="SELECT COUNT(*) FROM course";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$pager['recordCount']=intval($row['COUNT(*)']);//count函数返回的是一个字符串，需要解析为整数
	$pager['pageCount']=ceil($pager['recordCount']/$pager['pageSize']);//计算总页数  上取整

	/***查询当前页对应的数据,使用LIMIT***/
	$start=($pager['currentPage']-1)*$pager['pageSize'];//从哪一条记录开始
	$count=$pager['pageSize'];//一次读取多少条
	$sql="SELECT *FROM course LIMIT $start,$count";
	$courseResult=mysqli_query($conn,$sql);
	$course=[];
	while(($row=mysqli_fetch_assoc($courseResult))!=null){
		$course[]=$row;
	}
	$pager['data']=$course;//当前页面的数据
	//把待输出的数据编码为JSON格式，执行输出
	
	echo json_encode($pager);
?>