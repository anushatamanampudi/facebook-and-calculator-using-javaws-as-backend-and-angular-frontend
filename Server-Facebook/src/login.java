import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.jws.WebService;
import org.json.simple.JSONObject;


import org.json.simple.JSONArray;

import java.io.IOException;
import java.io.StringWriter;
import java.sql.*;

public class login {
	String dbUrl = "jdbc:mysql://localhost/facebook";
	  String userName = "root", dbpassword = "anusha";
		
	 @SuppressWarnings({ "finally", "unchecked" })
	  public String suggestFriends(String username, String password) throws IOException{
		 int statusCode=0;
		  
		  JSONArray jsonArray = new JSONArray();
		  JSONObject  data = new JSONObject();
		 try {
         
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection (dbUrl, userName, dbpassword);
			String suggestFriendsQuery="SELECT * from users where Username=? AND Password= ?";
			PreparedStatement preparedStatement = con.prepareStatement(suggestFriendsQuery);
			preparedStatement.setString(1,username);
			preparedStatement.setString(2,password);
			
		//	preparedStatement.setInt(1, userId);
		    ResultSet rs=preparedStatement.executeQuery();
		    System.out.println(rs);
		    while(rs.next()){
		    	JSONObject obj = new JSONObject();
		    	  obj.put("uid",rs.getString("UserId"));
		    	  obj.put("fname", rs.getString("firstname"));
		    	  obj.put("lname",rs.getString("lastname"));
		          
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