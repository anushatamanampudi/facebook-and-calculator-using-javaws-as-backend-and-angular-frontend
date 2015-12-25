import javax.jws.WebService;
import org.json.simple.JSONObject;


import org.json.simple.JSONArray;

import java.io.IOException;
import java.io.StringWriter;
import java.sql.*;

public class dashboard {
	String dbUrl = "jdbc:mysql://localhost/facebook";
	  String userName = "root", dbpassword = "anusha";
		
	 @SuppressWarnings({ "finally", "unchecked" })
	  public String details(String id1, String firstname) throws IOException{
		 int statusCode=0;
		  
		  JSONArray jsonArray = new JSONArray();
		  JSONObject  data = new JSONObject();
		 try {
       
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection (dbUrl, userName, dbpassword);
			//query="SELECT firstname from users where UserId IN (Select useridmine from friends where useridfrnd='" + uid + "' and status ='0');";
			//var user="SELECT UserId from users where firstname='" + req.fbsession.firstname + "';";
			//String Query2="SELECT UserId from users where firstname='" + req.fbsession.firstname + "' union SELECT useridmine from friends where useridfrnd='" +uid+ "' and status='2' union SELECT useridfrnd from friends where useridmine='" +uid+ "' and status='2';";
								
			String Query="SELECT UserId from users where firstname=? union SELECT useridmine from friends where useridfrnd=? and status='2' union SELECT useridfrnd from friends where useridmine=? and status='2'";
			
			PreparedStatement preparedStatement = con.prepareStatement(Query);
			preparedStatement.setString(1,firstname);
			preparedStatement.setString(2,id1);
			preparedStatement.setString(3,id1);
			
		//	preparedStatement.setInt(1, userId);
		    ResultSet rs=preparedStatement.executeQuery();
		    System.out.println(rs);
		    while(rs.next()){
		    	JSONObject obj = new JSONObject();
		    	  obj.put("uid",rs.getString("UserId"));
		    	  
		    	  
		    	  jsonArray.add(obj);
		    }
	       con.close();
			} //end try

			catch(ClassNotFoundException e) {
				e.printStackTrace();
			}

			catch(SQLException e) {
				e.printStackTrace();
			}
			finally {
				data.put("results",jsonArray);
				 return data.toJSONString();
			}
	}
	 
}


