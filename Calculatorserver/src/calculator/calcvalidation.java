/**
 * 
 */
package calculator;

import javax.jws.WebService;

/**
 * @author anushatamanampudi
 *
 */

@WebService
public class calcvalidation {
	
	public int add(int a,int b){
		int c=a+b;
		return c;
	}
	public int sub(int a,int b){
		int d=a-b;
		return d;
	}
	public int mul(int a,int b){
		int d=a*b;
		return d;
	}
	public int div(int a,int b){
		int d=a/b;
		return d;
	}

}
