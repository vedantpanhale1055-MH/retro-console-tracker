"""
eBay Finding API Scraper for Retro Gaming Consoles
This scraper uses eBay's official Finding API to fetch console listings
"""

import os
import requests
from datetime import datetime
from typing import List, Dict, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class EbayScraper:
    """
    Scraper for eBay Finding API
    Requires: EBAY_APP_ID from environment variables
    Get your API key at: developer.ebay.com
    """
    
    BASE_URL = "https://svcs.ebay.com/services/search/FindingService/v1"
    
    # Console search terms
    CONSOLES = [
        "Nintendo 64",
        "PlayStation 1",
        "Sega Genesis",
        "Super Nintendo",
        "GameCube",
        "Nintendo Entertainment System",
        "Sega Dreamcast",
        "PlayStation 2",
    ]
    
    # Video Game Consoles category ID
    CATEGORY_ID = "139971"
    
    def __init__(self):
        self.app_id = os.getenv("EBAY_APP_ID")
        if not self.app_id:
            raise ValueError("EBAY_APP_ID not found in environment variables")
    
    def search_console(self, console_name: str, condition: Optional[str] = None) -> Dict:
        """
        Search for a specific console on eBay
        
        Args:
            console_name: Name of the console (e.g., "Nintendo 64")
            condition: Filter by condition ("New", "Used", "For parts or not working")
        
        Returns:
            Dictionary with search results
        """
        params = {
            "OPERATION-NAME": "findCompletedItems",
            "SERVICE-VERSION": "1.0.0",
            "SECURITY-APPNAME": self.app_id,
            "RESPONSE-DATA-FORMAT": "JSON",
            "keywords": console_name,
            "categoryId": self.CATEGORY_ID,
            "paginationInput.entriesPerPage": "100",
            "sortOrder": "EndTimeSoonest",
        }
        
        # Add condition filter if specified
        if condition:
            params["itemFilter(0).name"] = "Condition"
            params["itemFilter(0).value"] = condition
        
        try:
            response = requests.get(self.BASE_URL, params=params)
            response.raise_for_status()
            data = response.json()
            
            return self._parse_response(data, console_name)
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching data for {console_name}: {e}")
            return {"error": str(e)}
    
    def _parse_response(self, data: Dict, console_name: str) -> Dict:
        """
        Parse eBay API response into clean format
        """
        try:
            search_result = data["findCompletedItemsResponse"][0]["searchResult"][0]
            
            if search_result.get("@count") == "0":
                return {
                    "console": console_name,
                    "count": 0,
                    "listings": [],
                    "timestamp": datetime.now().isoformat()
                }
            
            items = search_result.get("item", [])
            listings = []
            
            for item in items:
                listing = {
                    "title": item.get("title", [""])[0],
                    "item_id": item.get("itemId", [""])[0],
                    "price": self._get_price(item),
                    "condition": self._get_condition(item),
                    "sold": item.get("sellingStatus", [{}])[0].get("sellingState", [""])[0] == "EndedWithSales",
                    "end_time": item.get("listingInfo", [{}])[0].get("endTime", [""])[0],
                    "url": item.get("viewItemURL", [""])[0],
                    "shipping_cost": self._get_shipping(item),
                }
                listings.append(listing)
            
            return {
                "console": console_name,
                "count": len(listings),
                "listings": listings,
                "timestamp": datetime.now().isoformat()
            }
            
        except (KeyError, IndexError) as e:
            print(f"Error parsing response for {console_name}: {e}")
            return {"error": f"Parse error: {e}"}
    
    def _get_price(self, item: Dict) -> Optional[float]:
        """Extract price from item"""
        try:
            selling_status = item.get("sellingStatus", [{}])[0]
            current_price = selling_status.get("currentPrice", [{}])[0]
            return float(current_price.get("__value__", 0))
        except (KeyError, IndexError, ValueError):
            return None
    
    def _get_condition(self, item: Dict) -> Optional[str]:
        """Extract condition from item"""
        try:
            return item.get("condition", [{}])[0].get("conditionDisplayName", [""])[0]
        except (KeyError, IndexError):
            return None
    
    def _get_shipping(self, item: Dict) -> Optional[float]:
        """Extract shipping cost from item"""
        try:
            shipping_info = item.get("shippingInfo", [{}])[0]
            shipping_cost = shipping_info.get("shippingServiceCost", [{}])[0]
            return float(shipping_cost.get("__value__", 0))
        except (KeyError, IndexError, ValueError):
            return None
    
    def scrape_all_consoles(self) -> List[Dict]:
        """
        Scrape data for all consoles
        """
        results = []
        
        for console in self.CONSOLES:
            print(f"Scraping {console}...")
            result = self.search_console(console)
            results.append(result)
            
            # Be respectful - add a small delay between requests
            import time
            time.sleep(1)
        
        return results
    
    def calculate_market_stats(self, listings: List[Dict]) -> Dict:
        """
        Calculate market statistics from listings
        """
        if not listings:
            return {}
        
        prices = [l["price"] for l in listings if l.get("price")]
        sold_items = [l for l in listings if l.get("sold")]
        
        return {
            "total_listings": len(listings),
            "sold_count": len(sold_items),
            "avg_price": sum(prices) / len(prices) if prices else 0,
            "min_price": min(prices) if prices else 0,
            "max_price": max(prices) if prices else 0,
            "median_price": sorted(prices)[len(prices) // 2] if prices else 0,
        }


# Example usage
if __name__ == "__main__":
    scraper = EbayScraper()
    
    # Scrape a single cons
