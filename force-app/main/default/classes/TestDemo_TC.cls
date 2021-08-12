@istest
public class TestDemo_TC {
    
    @istest
    public static void testCheckSum(){
        TestDemo obj = new TestDemo();
        boolean isEven = obj.cckSum(10);
        System.assertEquals(true, isEven, 'test case failed');
        isEven = obj.cckSum(11);
        System.assertEquals(true, isEven, 'test case failed');
        
    }

}