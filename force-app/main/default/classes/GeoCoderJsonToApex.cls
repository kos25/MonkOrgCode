public class GeoCoderJsonToApex{
    
	public results[] results;
	public status status;
    
	public class results {
		public components components;
		public Integer confidence;	
		public String formatted;	
		public geometry geometry;
	}
    
	public class components {
		public String city;	
		public String continent;	
		public String country;	
		public String country_code;
		public String county;	
		public String house_number;	
		public String postcode;	
		public String road;	
		public String state;	
		public String state_code;	
	}
    
	public class geometry {
		public Double lat;	
		public Double lng;	
	}
    
	public class status {
		public Integer code;	
		public String message;	
	}
}